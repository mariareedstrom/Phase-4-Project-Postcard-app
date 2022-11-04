class PostcardSerializer < ActiveModel::Serializer
  attributes :id, :greeting, :image_url, :user, :destination, :comments, :favorites

  belongs_to :user
  belongs_to :destination
  has_many :comments

end
