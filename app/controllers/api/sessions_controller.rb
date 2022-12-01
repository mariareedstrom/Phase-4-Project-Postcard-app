class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, ]

  def create
    user = User.find_by_username(params[:username])
    if  user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def show
    if current_user
      user = current_user
    render json: user, status: :ok
    else
      authenticate_user
      end
  end

  def destroy
    if current_user
      session.delete :user_id
      head :no_content
    else
      authenticate_user
    end
  end

end
