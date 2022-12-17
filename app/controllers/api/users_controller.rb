class Api::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :show, :index]
  before_action :set_user, only:[:update, :destroy]
  before_action :is_authorized, only:[:update, :destroy]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def index
    users = User.all
    render json: users, include: :postcards, status: :ok
  end

  def show
    user = User.find(params[:id])
    render json: user, include: :postcards, status: :ok
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user, status: :ok
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  private

  def user_params
    params.permit(:username, :name, :password, :picture)
  end

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def is_authorized
    permitted = current_user.admin? || current_user.id == @user.id
    render json: "Action is not permitted", status: :forbidden unless permitted
  end
end
