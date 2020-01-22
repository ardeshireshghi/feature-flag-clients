RSpec.describe Feature::Flag::Client::Api do
    subject(:api) { described_class.new }

    context "#features" do
      let(:feature_service_response) { instance_double(HTTParty::Response, body: feature_service_response_body) }
      let(:feature_service_response_body) { "{\"loginForm4\":true,\"loginForm2\":true}" }

      before do
        allow(ENV).to receive(:[]).with("FEATURES_SERVICE_BASE_URI").and_return("http://localhost:8082")
        allow(HTTParty).to receive(:get).and_return(feature_service_response)
        allow(JSON).to receive(:parse)
        allow(subject.cache).to receive(:set)
        allow(subject.cache).to receive(:get)

        api.features
      end

      it 'parses the Feature Service response' do
        expect(JSON).to have_received(:parse).with(feature_service_response_body)
      end

      it 'sets the features cache' do
        expect(subject.cache).to have_received(:set).with(anything, JSON.parse(feature_service_response_body), anything)
      end

      it 'serves the features from cache after the next request' do
        expect(subject.cache).to have_received(:get)
        api.features
      end
    end


end
