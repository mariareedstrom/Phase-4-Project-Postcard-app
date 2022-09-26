class AddDestinationToPostcard < ActiveRecord::Migration[6.1]
  def change
    add_reference :postcards, :destination, foreign_key: true, null: false
  end
end
