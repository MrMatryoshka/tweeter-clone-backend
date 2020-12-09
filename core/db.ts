import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dbUser:dbUser2@cluster0.ep5yx.mongodb.net/tweeter-clone?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

export {db,mongoose} ;


