# frozen_string_literal: true

RSpec.describe FeatureFlagClient::Client do
  context '#initialize' do
    subject(:api_no_session) do
      described_class.configure do |c|
        c.api_base_url = 'http://localhost:8082/api/v1'
        c.auth_url = 'http://localhost:8083/auth/token'
        c.client_id = 'some id'
        c.client_secret = 'some secret'
      end
      described_class.new
    end

    after { described_class.instance_variable_set('@config', nil) }

    describe 'when session is not passed' do
      let(:api_session_mock) do
        instance_double(FeatureFlagClient::Session, access_token: 'JWT bearer token')
      end

      it 'creates session' do
        client = api_no_session
        expect(client.api_session).to be_kind_of(FeatureFlagClient::Session)
      end
    end

    describe 'when config is not valid' do
      subject(:api_with_invalid_config) do
        described_class.configure do |c|
          c.api_base_url = 'http://localhost:8082/api/v1'
        end
        described_class.new
      end

      it 'raises exception' do
        expect { api_with_invalid_config }.to raise_error(FeatureFlagClient::ClientError)
      end
    end
  end

  describe '#features' do
    let(:feature_flag_mock_features_body) do
      {
        "Post offer": {
          name: 'Post offer',
          enabled: true,
          createdAt: '2020-09-08T22:13:32.969Z',
          updatedAt: '2020-09-11T14:30:45.875Z'
        }
      }.to_json
    end

    let!(:api_session_mock) do
      instance_double(FeatureFlagClient::Session, access_token: 'JWT bearer token')
    end

    subject(:api) do
      described_class.configure do |c|
        c.api_base_url = 'http://localhost:8082/api/v1'
        c.api_session = api_session_mock
      end
      described_class.new
    end

    before do
      stub_request(:get, 'http://localhost:8082/api/v1/features?productName=some%20product')
        .with(headers: {
                Authorization: 'Bearer JWT bearer token'
              }).to_return(body: feature_flag_mock_features_body)

      allow(subject.cache).to receive(:set).and_call_original
      allow(subject.cache).to receive(:get).and_call_original
    end

    after { described_class.instance_variable_set('@config', nil) }

    it 'sets the features cache' do
      api.features('some product')
      expect(subject.cache).to have_received(:set).once
    end

    it 'serves the features from cache after the next request' do
      api.features('some product')
      api.features('some product')

      expect(subject.cache).to have_received(:set).once

      # mini-cache set calls get after set so we invoke 4 times in code
      expect(subject.cache).to have_received(:get).at_least(5).times
    end

    it 'returns the feature collection' do
      features = api.features('some product')
      expect(features).to be_a(FeatureFlagClient::FeatureCollection)
    end

    it 'returns the feature data' do
      features = api.features('some product')

      expect(features.feature('Post offer').enabled).to eq(true)
      expect(features.feature('Post offer').name).to eq('Post offer')
    end
  end
end
