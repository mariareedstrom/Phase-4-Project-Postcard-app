class Api::SessionsController < ApplicationController

  def create
    user = User.find_by_username(params[:username])
    if  user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { errors: ["Unauthorized"] }, status: :unauthorized
    end
  end

  def show
    user = current_user!
    render json: user, status: :ok

  end

  def destroy
    if session[:user_id]
      session.delete :user_id
      head :no_content
    else
      render json: { errors: ["Unauthorized"] }, status: :unauthorized
    end
  end

end
