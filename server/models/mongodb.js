const { MongoClient, ServerApiVersion } = require('mongodb');

function mongodb() {
  const client = new MongoClient(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  client.connect(err => {
    const collection = client.db('test').collection('devices');
    // perform actions on the collection object
    client.close();
  });
}

module.exports = mongodb;
