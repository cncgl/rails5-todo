# -*- encoding: utf-8 -*-
# stub: actioncable 5.0.0.beta1 ruby lib

Gem::Specification.new do |s|
  s.name = "actioncable"
  s.version = "5.0.0.beta1"

  s.required_rubygems_version = Gem::Requirement.new("> 1.3.1") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Pratik Naik", "David Heinemeier Hansson"]
  s.date = "2015-12-18"
  s.description = "Structure many real-time application concerns into channels over a single WebSocket connection."
  s.email = ["pratiknaik@gmail.com", "david@loudthinking.com"]
  s.homepage = "http://rubyonrails.org"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.2.2")
  s.rubygems_version = "2.5.0"
  s.summary = "WebSocket framework for Rails."

  s.installed_by_version = "2.5.0" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<actionpack>, ["= 5.0.0.beta1"])
      s.add_runtime_dependency(%q<coffee-rails>, ["~> 4.1.0"])
      s.add_runtime_dependency(%q<faye-websocket>, ["~> 0.10.0"])
      s.add_runtime_dependency(%q<websocket-driver>, ["~> 0.6.1"])
      s.add_runtime_dependency(%q<celluloid>, ["~> 0.17.2"])
      s.add_runtime_dependency(%q<em-hiredis>, ["~> 0.3.0"])
      s.add_runtime_dependency(%q<redis>, ["~> 3.0"])
      s.add_development_dependency(%q<puma>, [">= 0"])
      s.add_development_dependency(%q<mocha>, [">= 0"])
    else
      s.add_dependency(%q<actionpack>, ["= 5.0.0.beta1"])
      s.add_dependency(%q<coffee-rails>, ["~> 4.1.0"])
      s.add_dependency(%q<faye-websocket>, ["~> 0.10.0"])
      s.add_dependency(%q<websocket-driver>, ["~> 0.6.1"])
      s.add_dependency(%q<celluloid>, ["~> 0.17.2"])
      s.add_dependency(%q<em-hiredis>, ["~> 0.3.0"])
      s.add_dependency(%q<redis>, ["~> 3.0"])
      s.add_dependency(%q<puma>, [">= 0"])
      s.add_dependency(%q<mocha>, [">= 0"])
    end
  else
    s.add_dependency(%q<actionpack>, ["= 5.0.0.beta1"])
    s.add_dependency(%q<coffee-rails>, ["~> 4.1.0"])
    s.add_dependency(%q<faye-websocket>, ["~> 0.10.0"])
    s.add_dependency(%q<websocket-driver>, ["~> 0.6.1"])
    s.add_dependency(%q<celluloid>, ["~> 0.17.2"])
    s.add_dependency(%q<em-hiredis>, ["~> 0.3.0"])
    s.add_dependency(%q<redis>, ["~> 3.0"])
    s.add_dependency(%q<puma>, [">= 0"])
    s.add_dependency(%q<mocha>, [">= 0"])
  end
end
