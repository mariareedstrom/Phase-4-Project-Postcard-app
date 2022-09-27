require 'rails_helper'

RSpec.describe "Api::Destinations", type: :request do
  describe "GET /api/destinations" do
    let!(:oslo){Destination.create!(name: "Oslo")}
    let!(:austin){Destination.create!(name: "Austin")}
    let!(:malaga){Destination.create!(name: "Malaga")}

    it "returns an array of destinations" do
      get '/api/destinations' do
        expect(response.body).to include_json([
                                                {id: oslo.id,
                                                 name: oslo.name
                                                },
                                                {
                                                  id: austin.id,
                                                 name: austin.name
                                                },
                                                {
                                                  id: malaga.id,
                                                  name: malaga.name
                                                }
                                              ])
      end
    end
  end

  describe "GET /api/destinations/:id" do
    let!(:oslo){Destination.create!(name: "Oslo")}
    let!(:austin){Destination.create!(name: "Austin")}

    it "returns a destination by id" do
      get "/api/destinations/#{oslo.id}"
      expect(response.body).to include_json({
                                              id: oslo.id,
                                              name: oslo.name
                                            })
    end
  end

  describe "POST /api/destinations" do
    context "with valid input" do
    let!(:new_destination){{name: "Tampa"}}

    it "creates a new destination" do
      expect { post '/api/destinations', params: new_destination }.to change(Destination, :count).by(1)
    end

    it "returns the destination data" do
      post '/api/destinations', params: new_destination
      expect(response.body).to include_json({
                                              id: a_kind_of(Integer),
                                              name: "Tampa"
                                            })
    end

    it "returns a status code of 201 (created)" do
      post '/api/destinations', params: new_destination
      expect(response).to have_http_status(:created)
    end


end
    context "with invalid destination data" do
      let!(:new_destination) { { name: "" } }

      it "does not create a new destination" do
        expect { post '/api/destinations', params: new_destination }.to change(Destination, :count).by(0)
      end

      it "returns a status code of 422 (unprocessable entity" do
        post '/api/destinations', params: new_destination
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /api/destinations/:id" do
    let!(:destination){Destination.create!(name: "Hollywood")}

    it "deletes the destination with the matching id" do
      expect(Destination.find(destination.id).id).to eql(destination.id)
      delete "/api/destinations/#{destination.id}"
      expect(Destination.find_by_id(destination.id)).to be_nil
    end
  end

end
