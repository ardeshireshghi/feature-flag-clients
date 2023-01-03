# frozen_string_literal: true

lib = File.expand_path('lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'feature_flag_client/client/version'

Gem::Specification.new do |spec|
  spec.name = 'feature_flag_client'
  spec.version       = FeatureFlagClient::Version::VERSION
  spec.authors       = ['Ardeshir Eshghi']
  spec.email         = ['ardeshir.eshghi@fundingcircle.com']
  spec.required_ruby_version = '~> 2.4'

  spec.summary       = 'Write a short summary, because RubyGems requires one.'
  spec.description   = 'Write a longer description or delete this line.'
  spec.homepage      = 'https://github.com/ardeshireshghi/feature-flag-clients/tree/master/lib/clients/ruby/feature-flag-client'
  spec.license       = 'MIT'

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = 'https://rubygems.org'

    spec.metadata['homepage_uri'] = spec.homepage
    spec.metadata['source_code_uri'] = 'https://github.com/ardeshireshghi/feature-flag-clients/lib/clients/ruby'
    spec.metadata['changelog_uri'] = 'https://github.com/ardeshireshghi/feature-flag-clients/lib/clients/ruby/feature-flag-client/CHANGELOG.md'
  else
    raise 'RubyGems 2.0 or newer is required to protect against ' \
      'public gem pushes.'
  end

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_dependency 'httparty', '>= 0.17.3', '< 0.22.0'
  spec.add_dependency 'mini_cache', '~> 1.1'

  spec.add_development_dependency 'bundler', '~> 2.1'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'rspec', '~> 3.0'
  spec.add_development_dependency 'webmock', '~> 3.9'
end
