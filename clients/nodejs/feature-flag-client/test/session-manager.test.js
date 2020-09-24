const FeatureFlagSessionManager = require('../lib/session-manager');
const { MOCK_FEATURE_FLAG_SERVICE_ENDPOINT } = require('./support');

describe('FeatureFlagSessionManager', () => {
  describe('#constructor', () => {
    it('should create a session manager class', () => {
      const client = new FeatureFlagSessionManager({
        clientId: '645da701fce2a12c',
        clientSecret: '13c77ba6f8e742fb036cd9f9afa912A@',
        apiBasePath: MOCK_FEATURE_FLAG_SERVICE_ENDPOINT
      });
      expect(client).toBeInstanceOf(FeatureFlagSessionManager);
    });
  });

  describe('#accessToken', () => {
    it('should return accessToken', async () => {
      const sessionManager = new FeatureFlagSessionManager({
        clientId: '645da701fce2a12c',
        clientSecret: '13c77ba6f8e742fb036cd9f9afa912A@',
        apiBasePath: MOCK_FEATURE_FLAG_SERVICE_ENDPOINT
      });

      const accessToken = await sessionManager.accessToken();
      expect(accessToken).toEqual(
        'eyJraWQiOiJkSGNSNmJCek53aVBWZU15WFVlTmV4cTA2dWl0aDBEd0dYcWZnVWZzVjE0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZWEzODk5Mi0zODRiLTRkNWQtYWJhYy05OGU4OTViMDhiYjAiLCJldmVudF9pZCI6Ijc2MGRhODI1LWZlZWUtNDQ1NC1iMjIwLTg4ZjA0NjNjODMzMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDA5NDU4MjQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX1Rpam51eUdzTCIsImV4cCI6MTYwMTAzMjIyNCwiaWF0IjoxNjAwOTQ1ODI0LCJqdGkiOiIxNTBjMjFkZi0xMGJkLTRkOTEtYjU0NC1hOWFiMGU1ZGQ3NmMiLCJjbGllbnRfaWQiOiI0Yjh2aG9rcXAxdXBvYTV0NGhscDlvdXJoayIsInVzZXJuYW1lIjoiNjQ1ZGE3MDFmY2UyYTEyYyJ9.OnnsiGgie1dCY7xC3Tr5FADEteo9u8LAnDQWBbyoTgKvuFN7skiaOC6EUopUqY42x-hgYm1X83jY5LAa0JlxFQbOzHIBo747eCQYm5WlrIVAAJ1VAvMqPrcbH44mT1uv_berLVOyrTyCBaes4_UDvVk8mYavsi6dD9ztpgEQdcdlMKc-pHPpm-P8lAMwQmVLXNEk5h6bsVJ9rQhz5qHxO94zZ5mXee_e_k6iigHyNyuRT5Q8SSJ8nH0dPJKzwIIhUnX5RtHR-kUgylNzKiYkOBfAZpVPan0w-R5QxhWivo-92k8byp1VdjaMvtbY_RRn7MqKe5XOoGQVoxPSx6afOw'
      );
    });

    it('should use refresh token to get accessToken when token is expired', async () => {
      const sessionManager = new FeatureFlagSessionManager({
        clientId: '645da701fce2a12c',
        clientSecret: '13c77ba6f8e742fb036cd9f9afa912A@',
        apiBasePath: MOCK_FEATURE_FLAG_SERVICE_ENDPOINT
      });
      // Get the access token from API
      await sessionManager.accessToken();

      // Pretend the token is expired
      jest.spyOn(sessionManager, 'isTokenExpired').mockReturnValueOnce(true);

      const accessToken = await sessionManager.accessToken();
      expect(accessToken).toEqual(
        'eyJraWQiOiJkSGNSNmJCek53aVBWZU15WFVlTmV4cTA2dWl0aDBEd0dYcWZnVWZzVjE0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZWEzODk5Mi0zODRiLTRkNWQtYWJhYy05OGU4OTViMDhiYjAiLCJldmVudF9pZCI6Ijc2MGRhODI1LWZlZWUtNDQ1NC1iMjIwLTg4ZjA0NjNjODMzMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDA5NDU4MjQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX1Rpam51eUdzTCIsImV4cCI6MTYwMTAzMjIyNCwiaWF0IjoxNjAwOTQ1ODI0LCJqdGkiOiIxNTBjMjFkZi0xMGJkLTRkOTEtYjU0NC1hOWFiMGU1ZGQ3NmMiLCJjbGllbnRfaWQiOiI0Yjh2aG9rcXAxdXBvYTV0NGhscDlvdXJoayIsInVzZXJuYW1lIjoiNjQ1ZGE3MDFmY2UyYTEyYyJ9.OnnsiGgie1dCY7xC3Tr5FADEteo9u8LAnDQWBbyoTgKvuFN7skiaOC6EUopUqY42x-hgYm1X83jY5LAa0JlxFQbOzHIBo747eCQYm5WlrIVAAJ1VAvMqPrcbH44mT1uv_berLVOyrTyCBaes4_UDvVk8mYavsi6dD9ztpgEQdcdlMKc-pHPpm-P8lAMwQmVLXNEk5h6bsVJ9rQhz5qHxO94zZ5mXee_e_k6iigHyNyuRT5Q8SSJ8nH0dPJKzwIIhUnX5RtHR-kUgylNzKiYkOBfAZpVPan0w-R5QxhWivo-92k8byp1VdjaMvtbY_RRn7MqKe5XOoGQVoxPSx6afOw'
      );
    });
  });
});
