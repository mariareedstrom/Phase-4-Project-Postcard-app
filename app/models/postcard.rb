class Postcard < ApplicationRecord
  belongs_to :user
  belongs_to :destination

  has_many :comments

  validates :greeting, presence: true, length: { in: 50..250  }
  validates :image_url, presence: true
end
