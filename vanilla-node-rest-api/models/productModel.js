const mongoose = require("mongoose");
const Product = require('./produtSchema');

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        Product.find()
            .then(res => { console.log("product fetched. " + res.length); resolve(res); })
            .catch(err => { console.log("failed to get products.... " + err); resolve({ err }); });
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        Product.findById(id)
            .then(res => { console.log("product fetched. " + res.id); resolve(res); })
            .catch(err => { console.log("failed to get product by ID.... " + err); resolve({ err }); });
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        var p = new Product(product);
        p.save()
            .then(res => { console.log("product saved. " + res); resolve(res); })
            .catch(err => { console.log("failed to save product.... " + err); resolve({ err }); });
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        Product.updateOne({ "_id": id }, product)
            .then(res => { console.log("product updated. " + res); resolve(res); })
            .catch(err => { console.log("failed to update product.... " + err); resolve({ err }); });

    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        Product.findByIdAndDelete(id)
            .then(res => { console.log("product deletd. " + res); resolve({ id }); })
            .catch(err => { console.log("failed to delete product.... " + err); resolve({ err }); });
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}