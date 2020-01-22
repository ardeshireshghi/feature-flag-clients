require 'httparty'
require 'mini_cache'
require "feature/flag/client/version"

module Feature
  module Flag
    module Client
      class Api
        CACHE_KEY = 'features'.freeze
        CACHE_TTL = 3600.freeze

        def features(options = {})
          return cache.get(CACHE_KEY) unless cache.get(CACHE_KEY).nil?

          url = "#{ base_uri }#{ base_path }"
          response = HTTParty.get(url, options)
          parsed_response = JSON.parse(response.body)

          cache.set(CACHE_KEY, parsed_response, expires_in: CACHE_TTL)
          parsed_response
        end

        def version
          VERSION
        end

        def cache
          @cache ||= MiniCache::Store.new
        end

        private

        def base_uri
          ENV['FEATURES_SERVICE_BASE_URI']
        end

        def base_path
          "/features"
        end
      end
    end
  end
end
