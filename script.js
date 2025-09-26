import { hashMap, hashSet } from "./mapFactory.js";






//testing hash function outputs
// let _tableSize = 16;

//     function hash(key) {
//         let hashCode = 0;
      
//         const primeNumber = 31;
//         for (let i = 0; i < key.length; i++) {
//             hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _tableSize;
//             //modulo inside the loop helps avoid integer overflow
//         }

//         return hashCode;
//     }
//     console.log(hash('wolf'))
//     console.log(hash('dog'))
//     console.log(hash('cow'))
//     console.log(hash('helicopter'))
//     console.log(hash('shotgun'))
//     console.log(hash('graverobber'))
//     console.log(hash('z'))
//     console.log(hash('w'))