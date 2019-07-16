import axios from "axios";
import {BehaviorSubject, from} from "rxjs";

export default class ApiService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.API_BASE_URL
        });
    }

    initiateProgressListener(){
        this.progressListener = new BehaviorSubject(0);
    }

    uploadFile(file) {
        let formData = new FormData();
        formData.append('file', file);
        return from(this.axios.post(process.env.IMPORT_ENDPOINT, formData, {
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent.loaded);
                this.progressListener.next(Math.round((progressEvent.loaded * 100) / progressEvent.total))
            }
        }))
    }

    search(query) {
        return from(this.axios.post(process.env.SEARCH_ENDPOINT, {query: query}))
    }

}