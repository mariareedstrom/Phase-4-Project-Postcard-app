class User < ApplicationRecord
  has_secure_password

  has_many :postcards

  validates :username, presence: true, uniqueness: true, format: { with: /.+@.+/ }
  validates :name, presence: true
end
