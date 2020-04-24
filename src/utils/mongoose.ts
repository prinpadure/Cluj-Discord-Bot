import { default as mongoose } from "mongoose";

let init = () => {
    const dbOptions: mongoose.ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 5,
        connectTimeoutMS: 10000,
        family: 4,
    };
    console.log();
    mongoose.connect(process.env.MONGO_URI!, dbOptions).catch((reason) => {
        console.log(reason);
    });
    mongoose.set("useFindAndModify", false);
    (mongoose as any).Promise = global.Promise;

    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected succesfully!");
    });
    mongoose.connection.on("err", (err) => {
        console.error(`Mongoose connection error: \n${err.stack}`);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose disconnected");
    });
};

export = init;
