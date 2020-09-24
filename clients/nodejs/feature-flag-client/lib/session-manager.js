const fetch = require('isomorphic-unfetch');

class FeatureFlagSessionManager {
  constructor({ clientId, clientSecret, apiBasePath } = {}) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.apiBasePath = apiBasePath;
  }

  async accessToken() {
    if (!this._accessToken || this.isTokenExpired()) {
      const endpoint = `/auth/token`;
      let body = {
        client_id: this.clientId,
        client_secret: this.clientSecret
      };

      if (this._refreshToken) {
        body = { ...body, refresh_token: this._refreshToken };
      }

      const authResponse = await this._request(endpoint, {
        method: 'POST',
        body: JSON.stringify(body)
      });

      this._updateSession(authResponse);
    }

    return this._accessToken;
  }

  async _request(endpoint, options = {}) {
    const url = `${this.apiBasePath}${endpoint}`;

    const headers = {
      'Content-type': 'application/json'
    };

    let config = {
      headers,
      ...options
    };

    const r = await fetch(url, config);

    if (r.ok) {
      return await r.json();
    }
    throw new Error(r);
  }

  isTokenExpired() {
    return Date.now() > this._tokenExpiryTimeStamp;
  }

  _updateSession(authResponse) {
    this._accessToken = authResponse.access_token;
    this._refreshToken = authResponse.refresh_token;
    this._tokenExpiryTimeStamp = this._setExpiryByExpiresIn(authResponse.expires_in);
  }

  _setExpiryByExpiresIn(expiresInSeconds) {
    const d = new Date();
    d.setTime(d.getTime() + Number(expiresInSeconds) * 1000);

    return d.getTime();
  }
}

module.exports = FeatureFlagSessionManager;
