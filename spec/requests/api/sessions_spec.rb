require 'rails_helper'

RSpec.describe "Api::Sessions", type: :request do

  let!(:user){User.create!(name: 'Clark Clarkson', username: 'clark@email.com', password: "somepassword")}

  describe "POST /api/login" do

    context "with valid username and password" do

      it "returns the logged in user" do
        post "/api/login", params: { username: user.username, password: user.password }

        expect(response.body).to include_json({
                                                id: user.id,
                                                username: user.username
                                              })
      end

      it "sets the user ID in the session" do
        post "/api/login", params: { username: user.username, password: user.password }

        expect(session[:user_id]).to eq(user.id)
      end
    end

    context "with invalid password" do
      it "returns a 401 (Unauthorized) status code" do
        post "/api/login", params: { username: user.username, password: "123" }

        expect(response).to have_http_status(:unauthorized)
      end

      it "does not set the user ID in the session" do
        post "/api/login", params: { username: user.username, password: "123" }

        expect(session[:user_id]).to eq(nil)
      end
    end
  end

  describe "DELETE /api/logout" do
    context "with a logged in user" do
      before do
        post '/api/login', params: { username: user.username, password: user.password}
      end

      it "returns no content" do
        delete '/api/logout'

        expect(response).to have_http_status(:no_content)
      end

      it "deletes the user id from the session" do
        delete '/api/logout'

        expect(session[:user_id]).to eq(nil)
      end

    end

  end
  describe "GET /api/me" do
    let!(:user1){User.create!(name: 'Dave Davids', username: 'dave@email.com', password: "mypetsname")}
    let!(:user2){User.create!(name: 'Erik Eriksen', username: 'erik@email.com', password: "mymomsname")}

    it "returns the first user when the first user is logged in" do
      post '/api/login', params: {username: user1.username, password: user1.password, name: user1.name}
      get '/api/me'

      expect(response.body).to include_json({
                                              id: user1.id,
                                              username: user1.username,
                                              name: user1.name
                                            })
    end

    it "returns the second user when the second user is logged in" do
      post '/api/login', params: {username: user2.username, password: user2.password, name: user2.name}
      get '/api/me'

      expect(response.body).to include_json({
                                              id: user2.id,
                                              username: user2.username,
                                              name: user2.name
                                            })
    end

    it "returns unauthorized when no user is logged in" do
      get '/api/me'

      expect(response).to have_http_status(:not_found)
    end


  end


end