require 'rails_helper'

RSpec.describe Destination, type: :model do
  it "can be created successfully with valid data" do
    destination = Destination.create!(name: "Austin, TX")

    expect(destination).to be_valid
  end

  describe "Associations" do
    it {should have_many(:postcards)}
    it {should have_many(:users)}
  end

  describe "Validations" do
    it {is_expected.to validate_presence_of(:name)}
  end


end
