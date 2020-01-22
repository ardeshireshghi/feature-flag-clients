# frozen_string_literal: true

RSpec.describe FeatureFlagService::Session do
  subject(:session) do
    described_class.new(client_id: 'some_client_id', client_secret: 'some secret') do |s|
      s.auth_service_url = 'http://localhost:8083/auth/token'
    end
  end

  describe '#access_token' do
    let(:api_response) do
      { token_type: 'Bearer', access_token: 'some access token', refresh_token: 'some refresh token', expires_in: 86_400 }.to_json
    end

    before do
      stub_request(:post, 'localhost:8083/auth/token')
        .with(body: '{"client_id":"some_client_id","client_secret":"some secret"}', headers: {
                'Content-Type' => 'application/json'
              }).to_return(body: api_response)
    end

    it 'should use client id and secret to get access token' do
      expect(session.access_token).to eql('some access token')
    end
  end
end
