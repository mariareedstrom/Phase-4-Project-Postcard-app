class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :postcard
  has_one :user
  has_one :postcard

end
