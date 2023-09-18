import NodeCache from "node-cache";

// Cacher

class Cacher {

    cache:NodeCache;

    constructor() {
        this.cache = new NodeCache({stdTTL: 15});
        this.cache.flushAll();
    }

    contains(key:string):boolean {
        if(this.cache.has(key)) { return true; }
        return false;
    }

    get(key:string):any {
        const val:any = this.cache.get(key);
        return val;
    }

    insert(key:string, val:any) {
        this.cache.set(key, val);
    }

}

// Export

export default Cacher;
