class Api::V1::ChatroomController < ApplicationController
    protect_from_forgery with: :null_session
    # skip_before_action :verify_authenticity_token

    def create_chatroom
        @chatroom = Chatroom.new(chatroom_params)
        if @chatroom.save 
            render json: @chatroom
        else
            render error: { error: 'Unable to create user' }, status: 400
        end
    end

    def list_chatroom
        @chatrooms = Chatroom.all
        render json: @chatrooms
    end

    def get_chatroom
        @chatroom = Chatroom.find(params[:id])
        render json @chatroom
    end

    def list_message
        params_id = params[:id]
        @messages = Message.where("chatroom_id = #{params_id}")
        render json @messages
    end

    def send_message
        params_id = params[:id]
        content = params[:content]
        @message = Message.create chatroom_id: params_id,
                                  content: content
        if @message.save 
            render json: @message
        else
            render error: { error: 'Unable to send message' }, status: 400
        end
    end

    private

    def chatroom_params
        params.require(:name)
    end

    def message_params
        params.require(:content)
    end
end
