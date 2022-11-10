class Postcard < ApplicationRecord
  belongs_to :user
  belongs_to :destination

  has_many :comments
  has_many :favorites

  validates :greeting, presence: true, length: { in: 50..250  }
  validates :image_url, presence: true

  accepts_nested_attributes_for :destination
end
