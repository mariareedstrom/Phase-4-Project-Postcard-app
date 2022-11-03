Rails.application.routes.draw do



  namespace :api do

    resources :postcards, only: [:index, :create, :show, :destroy]
    resources :users, only: [:index, :show, :destroy, :update ]
    resources :destinations, only: [:index, :show, :create, :destroy]
    resources :comments

    post '/signup', to: 'users#create'

    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/me', to: 'sessions#show'

  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
