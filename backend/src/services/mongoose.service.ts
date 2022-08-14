import mongoose from "mongoose";

export function mongooseConnectDB(URI: string) {

    mongoose.connect(URI);

    // CONNECTION EVENTS
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open');
    });
    mongoose.connection.on('error',function (err) {
        console.log(`Mongoose default connection error: ${err}`);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
        });
    });
}

export function createGridFSBucket() {
    console.log("GridFSBucket: outputVideoBucket created!");
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        chunkSizeBytes:1024,
        bucketName:'outputVideoBucket'
    });
}
