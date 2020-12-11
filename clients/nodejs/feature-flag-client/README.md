# FeatureFlagClient

This `npm` package is the API client for FeatureFlag service and allows fetching feature flags for given product from the service.

## Installation

Add this line to your application's Gemfile:

```bash
$ npm install '@eardi/feature-flag-client'
```

## Usage

```javascript
// ES5: const FeatureFlagClient = require('@eardi/feature_flag_client');
import FeatureFlagClient from '@eardi/feature_flag_client';

const client = new FeatureFlagClient({
  clientId: '645da701fce2a12c',
  clientSecret: '13c77ba6f8e742fb036cd9f9afa912A@',
  apiBasePath: 'https://feature-service-url'
});

const productName = 'fancy app';
const features = await client.features(productName);
```

## Development

### Run unit tests

```bash
$ npm test
```

### Run code formatter

```bash
$ npm run format # Warning: This will reformat code
```
### Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ardeshireshghi/feature-flag-clients. This project is intended to be a safe, welcoming space for collaboration.

## License

The `npm` package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
