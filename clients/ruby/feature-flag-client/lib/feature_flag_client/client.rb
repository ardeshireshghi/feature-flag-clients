# frozen_string_literal: true

require 'httparty'
require 'mini_cache'
require 'json'

require_relative './client/version'

module FeatureFlagClient
  class ClientError < StandardError; end

  # Featureflag service Client configuration to set client details
  class Configuration
    attr_accessor :client_id, :client_secret, :api_base_url, :auth_url, :api_session
  end

  # Api response wrapper
  class Response
    def self.from_raw(raw_response)
      new(raw_response)
    end

    def initialize(raw_response)
      @body = raw_response.body
      @code = raw_response.code
    end

    def parsed
      @parsed ||= parse_response
    end

    def ok?
      @code >= 200 && @code < 400
    end

    def error
      case @code
      when 401...505
        parsed = JSON.parse(@body)
        parsed.key?('message') ? parsed['message'] : parsed['error']
      end
    end

    private

    def parse_response
      hash_response = JSON.parse(@body)
      hash_response.each_with_object({}) do |item, result|
        name, attributes = item
        result[name] = OpenStruct.new(attributes)
      end
    end
  end

  class FeatureCollection
    attr_reader :features

    def initialize(_features)
      p _features
      @features = _features
    end

    def feature(name)
      features[name]
    end

    def to_json(*_args)
      features.keys.each_with_object({}) do |feature_name, result|
        result[feature_name] = feature(feature_name).marshal_dump
      end.to_json
    end
  end

  # Api Client class to fetch the features
  class Client
    include FeatureFlagClient::Version

    CACHE_KEY = 'features'
    CACHE_TTL = 60

    def self.config
      @config ||= FeatureFlagClient::Configuration.new
    end

    def self.configure
      yield(config) if block_given?
    end

    def self.api_session
      @api_session ||= Session.new(client_id: config.client_id, client_secret: config.client_secret) do |s|
        s.auth_service_url = config.auth_url
      end
    end

    def initialize
      validate_config
    end

    def features(product_name)
      if cache.get("#{CACHE_KEY}_#{product_name}").nil?
        url = "#{config.api_base_url}#{features_pathname}"
        response = Response.from_raw(perform_request_with_query(url, productName: product_name))

        raise ClientError, response.error unless response.ok?

        cache.set("#{CACHE_KEY}_#{product_name}", FeatureCollection.new(response.parsed), expires_in: CACHE_TTL)
      end

      cache.get("#{CACHE_KEY}_#{product_name}")
    end

    def version
      VERSION
    end

    def cache
      @cache ||= MiniCache::Store.new
    end

    def api_session
      config.api_session || self.class.api_session
    end

    private

    def config
      self.class.config
    end

    def features_pathname
      '/features'
    end

    def validate_config
      raise ClientError, "'api_base_url' is not set" unless config.api_base_url

      %w[auth_url client_id client_secret].each do |config_key|
        raise ClientError, "'#{config_key}' is not set" if config.send(config_key).nil? && config.api_session.nil?
      end
    end

    def perform_request_with_query(url, query)
      HTTParty.get(url, {
                     query: query,
                     headers: {
                       'Authorization' => "Bearer #{api_session.access_token}"
                     }
                   })
    end
  end
end
