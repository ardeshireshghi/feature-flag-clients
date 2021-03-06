# frozen_string_literal: true

require 'httparty'

module FeatureFlagClient
  # Takes care of getting access_token necessary to call features service
  class Session
    attr_accessor :client_id, :client_secret, :auth_service_url

    def initialize(client_id:, client_secret:)
      @client_id = client_id
      @client_secret = client_secret
      yield(self) if block_given?
    end

    def access_token
      @token ||= request_access_token
      @token = request_access_token(refresh: true) if token_expired?
      @token
    end

    def refresh_token
      access_token if @parsed_auth_response.nil?
      @parsed_auth_response['refresh_token']
    end

    private

    def request_access_token(refresh: false)
      raise StandardError, 'auth_service_url must be defined' if auth_service_url.nil?

      auth_service_response_raw = HTTParty.post(auth_service_url, {
                                                  body: auth_params(refresh: refresh).to_json,
                                                  headers: {
                                                    'Content-Type' => 'application/json'
                                                  }
                                                })

      @parsed_auth_response = JSON.parse(auth_service_response_raw.body)
      @parsed_auth_response['access_token']
    end

    def token_expired?
      Time.now > Time.at(Time.now.to_i + @parsed_auth_response['expires_in'])
    end

    def auth_params(refresh: false)
      params = {
        client_id: client_id,
        client_secret: client_secret
      }

      return params unless refresh

      params.merge(refresh_token: @parsed_auth_response['refresh_token'])
    end
  end
end
