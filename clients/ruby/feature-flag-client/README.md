# FeatureFlagClient

This gem is the API client for FeatureFlag service and allows fetching feature flags for given product from the service.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'feature_flag_client'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install feature_flag_client

## Usage

```
    require 'feature_flag_client'

    # In some initializer
    FeatureFlagClient::Configure do |config|
        # Main resource API to get feature flags
        config.api_base_url = 'https://api-feature-flag-service.eu-west-1.elb.amazonaws.com/api/v1'

        # Featureflag service Auth api to get access token
        config.auth_url = 'https://api-feature-flag-service.eu-west-1.elb.amazonaws.com/auth/token'

        # client id and secret to get access token
        config.client_id = '645da701fce2a12c'
        config.client_secret = '13c77fa6f8e742fa036cd9f9afa912A@' # store this in a secret manager
    end

    # Elsewhere in the code
    client = FeatureFlagClient.new
    product_name = 'cool product'
    client.features('cool product')
    # => {"feature name"=>#<OpenStruct name="feature name", enabled=false, createdAt="2020-09-08T22:08:07.971Z", updatedAt="2020-09-18T23:37:59.479Z">, "feature name 2"=>#<OpenStruct name="feature name 2", enabled=true, createdAt="2020-09-08T22:08:14.309Z", updatedAt="2020-09-11T14:27:29.678Z">, "Magic Feature"=>#<OpenStruct name="Magic Feature", enabled=true, createdAt="2020-09-11T14:27:39.515Z", updatedAt="2020-09-11T14:27:45.873Z">}
```

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ardeshir/feature-flag-clients. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Feature::Flag::Client project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/ardeshireshghi/feature-flag-clients/blob/master/lib/clients/ruby/feature-flag-client/CODE_OF_CONDUCT.md).
