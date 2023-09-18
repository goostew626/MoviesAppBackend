import axios from "axios";

// ExternalApi

/*
 * Utility to perform API Requests on external sources
 */

class ExternalApi {

    url!:string;
    method!:string;
    headers!:{
        [key:string]: string
    };
    params!:{
        [key:string]: string
    };

    constructor() {
        this.init();
    }

    init() {
        this.url = "";
        this.method = "";
        this.headers = {};
        this.params = {};
        return this;
    }

    setUrl(url:string) {
        this.url = url;
        return this;
    }

    setMethod(method:string) {
        this.method = method;
        return this;
    }

    addHeader(key:string, val:string) {
        this.headers[key] = val;
        return this;
    }

    addParam(key:string, val:string) {
        this.params[key] = val;
        return this;
    }

    send() {
        let self = this;
        return new Promise((resolve:any, reject:any) => {
            const config = {
                url: self.url,
                method: self.method,
                headers: self.headers,
                params: self.params
            };

            axios.request(config)
                .then((res:any) => {
                    resolve(res);
                })
                .catch((err:any) => {
                    reject("External API Request Failed");
                });
        });
    }

}

// Export

export default ExternalApi;
