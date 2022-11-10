class Api::PostcardsController < ApplicationController
  before_action :set_postcard, only: [:show, :update, :destroy]
  before_action :is_authorized, only: [:update, :destroy]
  skip_before_action :authenticate_user, only: [:show]

  def index
    postcards = Postcard.all
    render json: postcards, include: [:user, :destination, :comments], status: :ok
  end

  def create
    postcard = Postcard.create!(postcard_params)
    render json: postcard, status: :created
  end

  def show
    render json: @postcard, include: [:user, :destination, :comments, :favorites], status: :ok
  end

  def update
    @postcard.update(postcard_params)
  end

  def destroy
    @postcard.destroy
    head :no_content
  end

  private

  def postcard_params
    params.permit(:user_id, :greeting, :image_url, :destination_id, destination_attributes: [ :id, :name])
  end

  def set_postcard
    @postcard = Postcard.find_by(id: params[:id])
  end


  def is_authorized
    permitted = current_user.admin? || @postcard.user == current_user
    render json: "Accessibility is not permitted", status: :forbidden unless permitted
  end

end
