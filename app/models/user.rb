class User < ApplicationRecord
  has_secure_password

  has_many :postcards
  has_many :destinations, through: :postcards

  validates :username, presence: true, uniqueness: true, format: { with: /.+@.+/ }
  validates :name, presence: true
end
