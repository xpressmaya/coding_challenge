# README

Built with `Ruby 3.1.2`, `Rails 7.0.3.1` and `MySQL`

# Add Master Key

If `master.key` error is thrown add it as an environment var:

From App root:

`EDITOR=nano bin/rails credentials:edit`

Add Master Key:

`RAILS_MASTER_KEY="xxxxxxxx"`

# DB:

The app uses a readonly replica for the primary database.

Had to move the multi db config from `config/initializers/multi_db.rb`  to `application.rb` because of this issue: https://github.com/rails/rails/issues/45162

Both the primary and replica dbs are on the same host.

To configure the databases create a user in mySQL to access this replica database with the appropriate permissions.

From terminal - run:

`sudo mysql`

`CREATE USER 'root_readonly'@'%';`

`GRANT SELECT ON code_challenge_development.* TO 'root_readonly'@'%';`

`flush privileges;`


# To run the app:

`bundle install`

`rake db:create`

`rake db:migrate`

`rails tailwindcss:build`

`bin/dev` to run server