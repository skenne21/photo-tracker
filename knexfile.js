module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/phototracker',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
    
  }, 
  test: {
    client: 'pg',
    connection: 'postgres://localhost/phototracker_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  }

}
