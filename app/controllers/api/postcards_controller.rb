class Api::PostcardsController < ApplicationController

  def index
    postcards = Postcard.all
    render json: postcards, status: :ok
  end

  def create
    postcard = Postcard.create!(postcard_params)
    render json: postcard, status: :created
  end

  def show
    postcard = Postcard.find(params[:id])
    render json: postcard, status: :ok
  end

  def destroy
    postcard = Postcard.find(params[:id])
    postcard.destroy
    head :no_content
  end

  private

  def postcard_params
    params.permit(:user_id, :greeting, :image_url)
  end


end
