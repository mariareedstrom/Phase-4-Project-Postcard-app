class Api::DestinationsController < ApplicationController

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
end
