class Api::FavoritesController < ApplicationController


  def create
    favorite = Favorite.create!(favorite_params)
    render json: favorite, status: :ok
  end

  def destroy
    favorite = Favorite.find(params[:id])
    if favorite.user_id == @current_user.id
      favorite.destroy
      head :no_content
      end
  end

  private


  def favorite_params
    params.permit(:user_id, :postcard_id)
  end

  end
