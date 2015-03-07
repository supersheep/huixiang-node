var knex = require('knex');
var config = require('config');

module.exports = knex({
  client: config.db_name,
  connection: {
      host     : config.db_host,
      user     : config.db_user,
      password : config.db_password,
      database : config.db_database
  }
});