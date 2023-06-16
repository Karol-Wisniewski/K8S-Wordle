import mongoClient from "../../utils/mongoClient.js";
import words from "../../Words.js";

class WordsService {

    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }

    async getAll() {
        try {
            console.log(words);
            return words;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }

    async add(word) {
        try {
            if (words.includes(word)) {
                throw new Error("Word already in the list!");
            }
            words.push(word);
            return words;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

const wordsService = new WordsService(mongoClient);

export default wordsService;