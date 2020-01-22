# frozen_string_literal: true

require 'httparty'
require 'mini_cache'
require 'json'

require_relative './client/version'

module FeatureFlagService
  class ClientError < StandardError; end

  class Client
    CACHE_KEY = 'features'
    CACHE_TTL = 3600

    include FeatureFlagService::Version

    attr_accessor :api_base_url, :api_session

    def initialize(api_session)
      @api_session = api_session
      yield(self) if block_given?
    end

    def features(product_name)
      return cache.get("#{CACHE_KEY}_#{product_name}") unless cache.get("#{CACHE_KEY}_#{product_name}").nil?

      raise ClientError, '"api_base_url" is not set' if api_base_url.nil?

      url = "#{api_base_url}#{features_pathname}"
      response_parsed = parse_response(perform_request_with_query(url, productName: product_name).body)

      cache.set("#{CACHE_KEY}_#{product_name}", response_parsed, expires_in: CACHE_TTL)
      response_parsed
    end

    def version
      VERSION
    end

    def cache
      @cache ||= MiniCache::Store.new
    end

    private

    def features_pathname
      '/features'
    end

    def perform_request_with_query(url, query)
      response = HTTParty.get(url, {
                                query: query,
                                headers: {
                                  'Authorization' => "Bearer #{api_session.access_token}"
                                }
                              })
      case response.code
      when 200...201
        response
      when 401...500
        error_message = response.parsed_response.key?('message') ? response.parsed_response['message'] : response.parsed_response['error']
        raise ClientError, error_message
      end
    end

    def parse_response(response_raw)
      hash_response = JSON.parse(response_raw)
      hash_response.each_with_object({}) do |feature, result|
        feature_name, attributes = feature
        result[feature_name] = OpenStruct.new(attributes)
      end
    end
  end
end
