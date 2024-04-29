Rails.application.routes.draw do
  devise_for :users
  get 'chat', to: 'chat#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  # REST API namespace
  namespace :api do
    namespace :v1 do
      # Chatroom api
      post 'chatroom', to: 'chatroom#create_chatroom'
      get 'chatroom', to: 'chatroom#list_chatroom'
      get 'chatroom:id', to: 'chatroom#get_chatroom'
      # Chatroom messages api
      get 'chatroom/:id/message', to: 'chatroom#list_message'
      post 'chatroom/:id/message', to: 'chatroom#send_message'
    end
  end
end
