
export default class Database {
    static validate(url) {
        if (!url) {
            throw new Error('MongoDB URL is required');
        }
    }
}