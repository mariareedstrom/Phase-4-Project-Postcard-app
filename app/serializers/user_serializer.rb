class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username

  has_many :postcards
  has_many :comments
end
