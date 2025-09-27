//linkedList factory containing only keys and link in each node
export function linkedList() {
    let _head = null;
    let _size = 0;

    function traverse(node, index){
        //recursive function to traverse list
        if (index === 1) return node;
        return traverse(node.getNext(), (index-1))
    }

    function convertToString(node, runningStr){
        //recursive function to build a string
        runningStr = runningStr+"( "+node.getValue()+" ) -> "

        if(node.getNext() === null){
            runningStr = runningStr+"null"
            return runningStr;
        }
        else return convertToString(node.getNext(), runningStr);
    }

    function detect(node, findValue, index){
        //recursive function to find value
        if (node.getValue() === findValue) return index;
        if (node.getNext() === null) return 0;
        return detect(node.getNext(), findValue, (index+1));
    }

    const append = (value) => {
        //adds new node containing value to end
        if (_size === 0) prepend(value);
        else{
            traverse(_head, _size).setNext(node(value));
            _size++;
        }
    };
        
    const prepend = (value) => {
        //adds new node containing value to start
        let newHead = node(value, _head);
        _head = newHead;
        _size++;
    };

    const size = () => {
        //returns total number of nodes
        return _size;
    };

    const head = () => {
        //returns first node in list
        return _head;
    };

    const tail = () => {
        if (_size === 1) return _head;
        //return last node
        return traverse(_head, _size);
    };

    const atIndex = (index) => {
        //return node at specific index
        if (index > _size) return null;
        else return traverse(_head, index);
    };

    const pop = () => {
        //removes last element from list
        if(_size === 1){
            _head.setValue(null);
        } else {
            traverse(_head, (_size-1)).setNext(null);
        }
        _size--;
    };

    const contains = (value) => {
        //return true if list contains value otherwise false
        if (detect(_head, value, 1) !== 0) return true;
        else return false;
    };

    const find = (value) => {
        //return index of node containing value else null
        let indexResult = detect(_head, value, 1);
        if (indexResult !== 0) return indexResult;
        else return null;
    };

    const toString = () => {
        //return linked list as a string
        if (_size === 0) return "null";
        else return convertToString(_head, "");
    };

    const insertAt = (value, index) => {
        //insert new node at given index, allow tail and head
        if (index > (_size+1)) return null;
        if (index === 1) return prepend(value);
        if (index === (size+1)) return append(value);
        else {
            let prevNode = traverse(_head, (index-1));
            let newNode = node(value, prevNode.getNext());
            prevNode.setNext(newNode);
        }
        _size++;
    };

    const removeAt = (index) => {
        //remove node at the given index
        if (index > _size) return null;
        if (index === _size) return pop();
        else if (index === 1){
            _head = _head.getNext();
        } else {
            let savedLink = traverse(_head, index).getNext();
            traverse(_head, (index-1)).setNext(savedLink);
        }
        _size--;
    };

    return {
        append,
        prepend,
        size,
        head,
        tail,
        atIndex,
        pop,
        contains,
        find,
        toString,
        insertAt,
        removeAt
    };
};

function node(value, next) {
    let _value = value ?? null;
    let _nextNode = next ?? null;

    const getValue = () => {
        return _value;
    };

    const getNext = () => {
        return _nextNode;
    };

    const setValue = (val) => {
        _value = val;
    };

    const setNext = (node) => {
        _nextNode = node;
    };

    return {
        getValue,
        getNext,
        setValue,
        setNext
    };
};