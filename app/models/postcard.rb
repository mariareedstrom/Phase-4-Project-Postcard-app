class Postcard < ApplicationRecord
  belongs_to :user
  belongs_to :destination

  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy

  validates :greeting, presence: true, length: { in: 50..250  }
  validates :image_url, presence: true

  accepts_nested_attributes_for :destination



end
