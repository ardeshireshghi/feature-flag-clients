const FeatureFlagClient = require('../lib/client');
const { MOCK_FEATURE_FLAG_SERVICE_ENDPOINT } = require('./support');

describe('FeatureFlagClient', () => {
  describe('#constructor', () => {
    it('should create a client', () => {
      const client = new FeatureFlagClient({
        clientId: '645da701fce2a12c',
        clientSecret: '13c77ba6f8e742fb036cd9f9afa912A@',
        apiBasePath: MOCK_FEATURE_FLAG_SERVICE_ENDPOINT
      });
      expect(client).toBeInstanceOf(FeatureFlagClient);
    });
  });

  describe('#features', () => {
    it('should return features when product exists', async () => {
      const client = new FeatureFlagClient({
        clientId: '645da701fce2a12c',
        clientSecret: '13c77ba6f8e742fb036cd9f9afa912A@',
        apiBasePath: MOCK_FEATURE_FLAG_SERVICE_ENDPOINT
      });

      const features = await client.features('product name');
      expect(features.get('Burning Hot')).toEqual({
        name: 'Burning Hot',
        enabled: false,
        createdAt: '2020-09-24T09:30:41.905Z',
        updatedAt: '2020-09-24T09:30:41.905Z'
      });

      expect([...features.keys()]).toHaveLength(3);
    });

    it('should return empty map when product does not exists', async () => {
      const client = new FeatureFlagClient({
        clientId: '645da701fce2a12c',
        clientSecret: '13c77ba6f8e742fb036cd9f9afa912A@',
        apiBasePath: MOCK_FEATURE_FLAG_SERVICE_ENDPOINT
      });

      const features = await client.features('non-existing product');
      expect([...features.keys()]).toHaveLength(0);
    });
  });
});
