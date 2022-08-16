class CreateEmployments < ActiveRecord::Migration[7.0]
  def change
    create_table :employments do |t|
      t.string :employer, null: false
      t.string :date_started, null: false
      t.string :date_ended, null: false

      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end
