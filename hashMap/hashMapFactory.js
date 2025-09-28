import { linkedList } from "./mapListFactory.js";

export function hashMap(){

    let _load = 0;
    let _deloadFactor = .25
    let _loadFactor = .75;
    //bucketMap entries are initialized to undefined
    let _bucketMap = [];
    let _capacity = 16;
    _bucketMap.length = _capacity;

    function hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _capacity;
            //modulo inside the loop helps avoid integer overflow
        }
        
        return hashCode;
    }

    function changeCapacity(grow){
        //allow for growing or shrinking
        if (grow) _capacity=_capacity*2;
        else _capacity=_capacity/2;
        console.log("Rehasing with capacity: "+_capacity)
        //allocate new bucket array
        let tempMap = _bucketMap;
        clear();//discard old bucket array
        //rehash every key-value pair, including each node in a list
        for (let i=0; i<tempMap.length; i++){
            if(tempMap[i]){
                while (tempMap[i].size() !== 0){
                    set(tempMap[i].tail().getKey());
                    tempMap[i].pop();
                }
            }
        }
        console.log("REHASH COMPLETE")
        
    }
    
    const set = (key, value) => {
        //if key already exists, exit set
        let newHash = hash(key, value);
        if (!_bucketMap[newHash]) {
            _bucketMap[newHash] = new linkedList();
            _bucketMap[newHash].prepend(key, value);


            //growCapacity exactly when map reaches the load factor
            _load++;
            
            if ((_load/_bucketMap.length) >= _loadFactor) changeCapacity(1);

        } else {
            if (_bucketMap[newHash].contains(key)){
                console.log("key already exists. Set failure")
                return 0;
            } else {
                _bucketMap[newHash].append(key, value);

            }
        }
        console.log("load: "+_load/_bucketMap.length)
        console.log ("assigned to bucket: "+newHash)
    }

    const get = (key) => {
        //takes key and returns value. else null
        let newHash = hash(key);
        if (_bucketMap[newHash]){
            let foundIndex = _bucketMap[newHash].find(key);
            if (foundIndex){
                return _bucketMap[newHash].atIndex(foundIndex).getValue();
            }
        }
        return null;
    }

    const has = (key) => {
        //returns true if key is found otherwise false
        if (_bucketMap[hash(key)]){
            if (_bucketMap[hash(key)].contains(key)) return true;
        }
        return false;
    }

    const remove = (key) => {
        //remove entry with key and return true. if key isnt found return false
        let newHash = hash(key);
        if (!_bucketMap[newHash]) return false;
        let foundIndex = _bucketMap[newHash].find(key);
        if (!foundIndex) return false;
        _bucketMap[newHash].removeAt(foundIndex);
        //adjust load and change capacity if necessary
        _load--;
        if ((_load/_bucketMap.length) <= _deloadFactor && _capacity > 16) changeCapacity();
        console.log('load: '+_load/_bucketMap.length);
        console.log('removed key from bucket: '+newHash)
        return true;
    }

    const length = () => {
        //returns the number of stored keys in hashmap
        let count = 0;
        for (let i=0; i<_capacity; i++){
            if(_bucketMap[i]){
                count += _bucketMap[i].size();
            }
        }
        return count;
    }

    const clear = () => {
        //removes all entries in hashmap
        _load = 0;
        _bucketMap = [];
        _bucketMap.length = _capacity;
    }

    const keys = () => {
        //returns array containing all keys in hashmap
        let keyArr = [];
        let k = 0;
        for (let i=0; i<_capacity; i++){
            if(_bucketMap[i]){
                let j = 1;
                while (j <= _bucketMap[i].size()){
                    keyArr[k] = _bucketMap[i].atIndex(j).getKey();
                    j++;
                    k++;
                }
            }
        }
        return keyArr;
    }

    const values = () => {
        //returns array containing all values
        let valArr = [];
        let k = 0;
        for (let i=0; i<_capacity; i++){
            if(_bucketMap[i]){
                let j = 1;
                while (j <= _bucketMap[i].size()){
                    valArr[k] = _bucketMap[i].atIndex(j).getValue();
                    j++;
                    k++;
                }
            }
        }
        return valArr;
    }

    const entries = () => {
        //returns a 2d array containing each key value pair
        let hashArr = [];
        let k = 0;
        for (let i=0; i<_capacity; i++){
            if(_bucketMap[i]){
                let j = 1;
                while (j <= _bucketMap[i].size()){
                    hashArr[k]=[];
                    hashArr[k][0] = _bucketMap[i].atIndex(j).getKey();
                    hashArr[k][1] = _bucketMap[i].atIndex(j).getValue();
                    j++;
                    k++;
                }
            }
        }
        return hashArr;

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