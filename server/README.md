# WiseQueue Server NodeJS, Express

## Requirements - Detailed in the parent readme

- Node and npm - Installation detailed in the parent readme
- Mongodb: 
```
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt install mongodb-server
sudo mkdir -p /data/db
sudo chown -R `whoami`:`whoami` /data
```

- Start the database: `mongod`

## Installation

- Install dependencies: `npm install`
- Start the server: `node server.js`

## Testing the API
- Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)
  - GET: http://localhost:8001/api
