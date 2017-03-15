module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '178.62.37.7',
      username: 'root',
      // pem: './path/to/pem'
      password: 'a2b3ed37e19864cd067663eb4f'
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'events',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://eventsapp.000webhostapp.com',
      MONGO_URL: 'mongodb://localhost/meteor',
    },


    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
