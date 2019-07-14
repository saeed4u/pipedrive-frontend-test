import axios from "axios";
import {BehaviorSubject, from} from "rxjs";

export default class ApiService {
    constructor() {
        this.progressListener = new BehaviorSubject(0);
        this.axios = axios.create({
            baseURL: process.env.API_BASE_URL
        });
    }

    uploadFile(file) {
        let formData = new FormData();
        formData.append('file', file);
        return from(this.axios.post(process.env.IMPORT_ENDPOINT, formData, {
            onUploadProgress: (progressEvent) => {
                this.progressListener.next(Math.round((progressEvent.loaded * 100) / progressEvent.total))
            }
        }))
    }

    search(query) {
        return from(this.axios.post(process.env.SEARCH_ENDPOINT, {query: query}))
    }

}