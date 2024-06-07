import mongoose from 'mongoose';

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(mongodb:/localhost:27017/categories)
        console.log('Database Connected Successfully');
    }
    catch (error) {
        console.log(error);
        console.log('Error conneting Database')
    }
}

export default ConnectDB;