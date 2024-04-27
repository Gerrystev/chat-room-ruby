# frozen_string_literal: true

class ChatController < ApplicationController
  layout "chat"

  def index
    @chat_props = { name: "Stranger" }
  end
end
