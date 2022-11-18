class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :postcard

  validates :content, length: { minimum: 2 }
end
