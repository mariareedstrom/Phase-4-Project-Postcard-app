class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :picture, :destinations

  has_many :postcards
  has_many :comments
end
