class Postcard < ApplicationRecord
  belongs_to :user
  belongs_to :destination

  validates :greeting, presence: true, length: { in: 50..250  }
  validates :image_url, presence: true
end
