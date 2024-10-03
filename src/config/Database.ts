import mongoose from "mongoose";

export default class Database {
    static connect(url: string | undefined) {
        if(url) {
            mongoose.connect(url)
        } else {
            console.log('No URL provided');
        }   
    }
}