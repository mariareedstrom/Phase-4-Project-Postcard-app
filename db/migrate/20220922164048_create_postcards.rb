class CreatePostcards < ActiveRecord::Migration[6.1]
  def change
    create_table :postcards do |t|
      t.references :user, null: false, foreign_key: true
      t.text :greeting
      t.string :image_url

      t.timestamps
    end
  end
end
