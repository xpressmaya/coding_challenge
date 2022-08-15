class User < ApplicationRecord

	has_many :employments, dependent: :destroy
	accepts_nested_attributes_for :employments, allow_destroy: true

	validates :first_name, presence: true, length: {maximum: 25}
	validates :last_name, presence: true, length: {maximum: 50}
	validates :email_address, presence: true, uniqueness: true
	validates :phone_number, presence: true, uniqueness: true
end
