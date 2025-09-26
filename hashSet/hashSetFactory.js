import { linkedList } from "./listFactory.js";

export function hashMap(){

    let _loadFactor = .75;
    //bucketMap entries are initialized to undefined
    let _bucketMap = [];
    _bucketMap.length = 16;

    function hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _bucketMap.length;
            //modulo inside the loop helps avoid integer overflow
        }

        return hashCode;
    }

    function growCapacity(){
        //allocate new bucket array with double size
        //rehash every key-value pair, including each node in a list
        //discard old bucket array
    }
    
    const set = (key, value) => {
        //if key already exists, overwrite and update key's value
        //growCapacity exactly when the map reaches the load factor

    }

    const get = (key) => {
        //takes key and returns value. else null
    }

    const has = (key) => {
        //returns true if key is found otherwise false
    }

    const remove = (key) => {
        //remove entry with key and return true. if key isnt found return false
    }

    const length = () => {
        //returns the number of stored keys in hashmap
    }

    const clear = () => {
        //removes all entries in hashmap (should reduce tablesize as well)
    }

    const keys = () => {
        //returns array containing all keys in hashmap
    }

    const values = () => {
        //returns array containing all values
    }

    const entries = () => {
        //returns an array containing each [[key, value],[key, value], ... ]
    }

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries
    }

};

export function hashSet(){

};

//LIMITATION: Use the following snippet whenever you access a bucket through an index.
//We want to throw an error if we try to access an out-of-bounds index:

// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }