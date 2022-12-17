class Api::DestinationsController < ApplicationController
  before_action :set_destination, only: [:destroy]
  before_action :is_authorized, only: [:destroy]

  def index
    destinations = Destination.all
    render json: destinations, status: :ok
  end

  def show
    destination = Destination.find(params[:id])
    render json: destination, status: :ok
  end

  def create
    destination = Destination.create!(destination_params)
    render json: destination, status: :created
  end

  def destroy
    destination = Destination.find(params[:id])
    destination.destroy
    head :no_content
  end

  private

  def destination_params
    params.permit(:name)
  end

  def set_destination
    @destination = Destination.find_by(id: params[:id])
  end

  def is_authorized
    permitted = current_user.admin? || @destination.user == current_user
    render json: "Action is not permitted", status: :forbidden unless permitted
  end

end
