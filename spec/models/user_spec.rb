require 'rails_helper'

RSpec.describe User, type: :model do
  it "can be created successfully with valid data" do
    user = User.create(username: "test@user.com", password: "secret", name: "Foo")
    expect(user).to be_valid
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_uniqueness_of(:username) }
    it { is_expected.to allow_value("user@email.com").for(:username) }
    it { is_expected.to_not allow_value("user@").for(:username) }
    it { is_expected.to_not allow_value("@email.com").for(:username) }
    it { is_expected.to_not allow_value("foo").for(:username) }

    it { is_expected.to validate_presence_of(:password) }

    it { is_expected.to allow_value("John").for(:name) }
  end
end

