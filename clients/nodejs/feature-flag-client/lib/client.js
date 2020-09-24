const fetch = require('isomorphic-unfetch');
const FeatureFlagSessionManager = require('./session-manager');

class FeatureFlagClient {
  constructor({ clientId, clientSecret, apiBasePath } = {}) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.apiBasePath = apiBasePath;
  }

  async features(productName) {
    if (!productName) {
      throw new TypeError('productName is not passed');
    }

    const endpoint = `/api/v1/features?productName=${encodeURIComponent(productName)}`;
    const response = await this._request(endpoint, {
      method: 'GET'
    });

    return new Map(Object.entries(response));
  }

  async _request(endpoint, options = {}) {
    const url = `${this.apiBasePath}${endpoint}`;
    const accessToken = await this._getAccessToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/json'
    };

    let config = {
      headers,
      ...options
    };

    try {
      const r = await fetch(url, config);
      const resBody = await r.text();

      if (r.ok) {
        return JSON.parse(resBody);
      } else if (r.status === 404) {
        return {};
      }

      throw new Error(`Request to fetch reatures failed with statusText '${r.statusText}' and payload: '${resBody}'`);
    } catch (err) {
      console.error('Cannot read features', err);
      throw err;
    }
  }

  async _getAccessToken() {
    if (!this.session) {
      this.session = new FeatureFlagSessionManager(this);
    }

    return await this.session.accessToken();
  }
}

module.exports = FeatureFlagClient;

// c = new FeatureFlagClient({
//   clientId: '645da701fce2a12c',
//   clientSecret: '13c77ba6f8e742fb036cd9f9afa912A@',
//   apiBasePath: 'https://yeahrnb59i.execute-api.eu-west-1.amazonaws.com/dev'
// });

// (async () => {
//   global.result = await c.features('Burning Question');
//   console.log('RESuLT', result);
// })()
