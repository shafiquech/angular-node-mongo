const http = require('http')
const mongoose = require("mongoose");
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, handleOptions } = require('./controllers/productController')

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    } else if (req.url.match(/\/api\/products\/([a-zA-Z0-9])/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if (req.url.match(/\/api\/products\/([a-zA-Z0-9])/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else if (req.url.match(/\/api\/products\/([a-zA-Z0-9])/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    } else if (req.method === 'OPTIONS') {
        handleOptions(req, res);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})


const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// connect MongoDb
const connectionString = process.env.MONGO_DB_URL || "mongodb://root:root@localhost:27017/olb?authSource=admin";
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    useNewUrlParser: true
}

const connectWithRetry = () => {
    console.log('Connection MongoDB... ');
    console.log('connectionString ' + connectionString);
    mongoose.connect(connectionString, options).then(() => {
        console.log('MongoDB is connected.')
    }).catch(err => {
        console.log('Connection unsuccessful, will retry after 5 seconds...')
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry();
// end of Mongo DB connection settings