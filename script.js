import { hashMap } from "./hashMap/hashMapFactory.js";
import { hashSet } from "./hashSet/hashSetFactory.js";
const test = new hashMap();

 test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')

console.log(test.has('hat'))
console.log(test.length())
console.log(test.keys())
console.log(test.values())

console.log(test.remove("apple"))
console.log(test.remove("banana"))
console.log(test.entries())
console.log(test.get("hat"))

const test2 = new hashSet();