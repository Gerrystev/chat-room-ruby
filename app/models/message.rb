class Message < ApplicationRecord
  # field :id, ID, null: false
  # field :content, String
  # field :post_id, Integer, null: false
  belongs_to :chatroom
end
