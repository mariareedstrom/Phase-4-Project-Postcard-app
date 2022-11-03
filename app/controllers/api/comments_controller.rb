class Api::CommentsController < ApplicationController

  def create
    comment = Comment.create!(comment_params)
    render json: comment, status: :ok
  end

  def index
    comments = Comment.all
    render json: comments, status: :ok
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.user_id == @current_user.id
      comment.destroy
      head :no_content
    end
  end

  private


  def comment_params
    params.permit(:content, :user_id, :postcard_id )
  end
end
