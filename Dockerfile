# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.3.1
FROM registry.docker.com/library/ruby:$RUBY_VERSION as base

# Rails app lives here
WORKDIR /rails

# Copy application code
COPY . .

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libvips postgresql-client pkg-config npm nodejs yarn

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Install dependencies
RUN npm install

# # Precompile bootsnap code for faster boot times
# RUN bundle exec bootsnap precompile app/ lib/

# # Precompiling assets for production without requiring secret RAILS_MASTER_KEY
# RUN SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile

# Entrypoint prepares the database.
# ENTRYPOINT ["/rails/bin/docker-entrypoint"]

RUN ./bin/rails db:prepare

# Start the server by default, this can be overwritten at runtime
EXPOSE 8080
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
