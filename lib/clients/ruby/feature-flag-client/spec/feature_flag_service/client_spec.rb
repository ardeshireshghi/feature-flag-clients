# frozen_string_literal: true

RSpec.describe FeatureFlagService::Client do
  let(:api_session_mock) do
    instance_double(FeatureFlagService::Session, access_token: 'JWT bearer token')
  end

  subject(:api) do
    described_class.new(api_session_mock) do |c|
      c.api_base_url = 'http://localhost:8082/api/v1'
    end
  end

  context '#features' do
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

    before do
      stub_request(:get, 'localhost:8082/api/v1/features?productName=some%20product')
        .with(headers: {
                Authorization: 'Bearer JWT bearer token'
              }).to_return(body: feature_flag_mock_features_body)

      allow(subject.cache).to receive(:set)
      allow(subject.cache).to receive(:get)

      api.features('some product')
    end

    it 'sets the features cache' do
      expect(subject.cache).to have_received(:set)
    end

    it 'serves the features from cache after the next request' do
      expect(subject.cache).to have_received(:get)
      api.features('some product')
    end
  end
end
