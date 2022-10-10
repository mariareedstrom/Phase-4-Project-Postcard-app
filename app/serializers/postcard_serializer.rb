class PostcardSerializer < ActiveModel::Serializer
  attributes :id, :greeting, :image_url, :user, :destination

  belongs_to :user
  belongs_to :destination

end
