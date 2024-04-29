class ChatChannel < ApplicationCable::Channel
  def subscribed
    # params_id = params[:id]
    # messages = Message.where("chatroom_id = #{params_id}")
    stream_from "room_#{params[:room]}"
    # stream_for messages
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_stream_from "room_#{params[:room]}"
  end

  # def send_message(data)
  #   @message = Message.new(content: data['content'])
  #   if @message.save
  #     ActionCable.server.broadcast "chat_channel", message: @message.content
  #   end
  # end
end
