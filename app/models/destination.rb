class Destination < ApplicationRecord

  has_many :postcards
  has_many :users, through: :postcards

  validates :name, presence: true
end
