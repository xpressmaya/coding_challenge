class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :nick_name
      t.string :email_address, null: false
      t.string :phone_number, null: false

      t.timestamps null: false
    end
  end
end
