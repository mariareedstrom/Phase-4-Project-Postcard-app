require 'rails_helper'

RSpec.describe "Api::Postcards", type: :request do

  describe "GET /api/postcards" do
    let!(:alice){User.create!(name: 'Alice Alisson', username: 'alice@email.com', password: "sosecure")}
    let!(:bob){User.create!(name: 'Bob Bobson', username: 'bob@email.com', password: "sosecure")}
    let!(:card1){Postcard.create!(user: alice, greeting: "Hi there, We're on vacation in Rome! The food and weather is great. Wish you were here! xox ", image_url: "http://foo")}

    it "returns an array of postcards" do
      get '/api/postcards'
      expect(response.body).to include_json([
                                              {
                                                id: card1.id,
                                                user_id: alice.id,
                                                greeting: card1.greeting,
                                                image_url: card1.image_url
                                              }
                                            ])
    end

  end



  describe "POST /api/postcards" do
    context "with valid input" do
      let!(:bob){User.create!(name: 'Bob Bobson', username: 'bob@email.com', password: "sosecure")}
      let!(:card_params){
        { user_id: bob.id,
          greeting: "Hi there, We're on vacation in Rome! The food and weather is great. Wish you were here!",
          image_url: "http://foo.com"
        }
      }

      it 'creates a new postcard' do
        expect { post '/api/postcards', params: card_params }.to change(Postcard, :count).by(1)
      end

      it 'returns the postcard data' do
        post '/api/postcards', params: card_params

        expect(response.body).to include_json({
                                                id: a_kind_of(Integer),
                                                user_id: bob.id,
                                                greeting: "Hi there, We're on vacation in Rome! The food and weather is great. Wish you were here!",
                                                image_url: "http://foo.com"
                                              })
      end

      it 'returns a status code of 201 (created)' do
        post '/api/postcards', params: card_params

        expect(response).to have_http_status(:created)
      end

  end
  end

  describe "GET /api/postcards/:id"  do
    let!(:user_params){User.create!(name: 'Alice Alisson', username: 'alice@email.com', password: "sosecure")}
    let!(:card_params){Postcard.create!( user_id: user_params.id,
                                     greeting: "Hi there, We're on vacation in Rome! The food and weather is great. Wish you were here!",
                                     image_url: "http://foo.com"
                                   ) }

      it "returns a postcard by id" do
        get "/api/postcards/#{card_params.id}"
        expect(response.body).to include_json({
                                                id: card_params.id,
                                                greeting: card_params.greeting,
                                                image_url: card_params.image_url
                                              })
      end
      end

  describe "DELETE /api/postcards/:id" do
    let!(:user){User.create!(name: 'Bob Bobson', username: 'bob@email.com', password: "sosecure")}
    let!(:card){Postcard.create!(user_id: user.id,
                                       greeting: "Hi there, We're on vacation in Rome! The food and weather is great. Wish you were here!",
                                       image_url: "http://foo.com"
    )}

    it "deletes the postcard with the matching id" do
      expect { delete "/api/postcards/#{card.id}" }.to change(Postcard, :count).by(-1)
    end

    end

      end
