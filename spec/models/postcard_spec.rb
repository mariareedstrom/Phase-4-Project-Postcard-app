require 'rails_helper'

RSpec.describe Postcard, type: :model do
  it "can be created successfully with valid data" do

    user = User.create(name: "Bob Bobson", username: "bob@email.com", password: "sosecure")
    destination = Destination.create(name: "Austin")
    postcard = Postcard.create(greeting: "Hi there, We are on vacation in Rome! We have seen the Colosseum and the Trevi Fountain today. Next we are going to the Spanish Steps. The food and weather is great. Wish you were here! xox ",
                               image_url: "https://i.pinimg.com/originals/92/dd/d9/92ddd99ae5276480d3089e72decb2a85.jpg",
                               user_id: user.id,
                               destination_id: destination.id
                               )
    expect(postcard).to be_valid
  end

  describe "Associations" do
    it { should belong_to(:user) }
    it { should belong_to(:destination) }
  end

  describe "Validations" do
    it { is_expected.to validate_presence_of(:greeting) }
    it { is_expected.to validate_length_of(:greeting).is_at_least(50).is_at_most(250) }
    it { is_expected.to validate_presence_of(:image_url) }
  end

end

