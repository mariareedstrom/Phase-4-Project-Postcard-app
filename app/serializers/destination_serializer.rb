class DestinationSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :postcards
end
