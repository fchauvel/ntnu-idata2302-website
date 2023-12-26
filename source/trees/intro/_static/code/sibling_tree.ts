

class Tree<T> {
    private root: Node<T> | null;

    construtor(root: Node<T> | null) {
        this.root = root;
    }

    get isEmpty() {
        return this.root == null;
    }

}


class Node<T> {
    public readonly item: T;
    private child: Node<T> | null;
    private sibling: Node<T> | null;

    constructor(item: T, child: Node<T> | null, sibling: Node<T> | null) {
        this.item = item;
        this.child = child;
        this.sibling = sibling;
    }

    addChild(newChild: Node<T>) {
        if (this.hasChildren) {
            this.child.addSibling(newChild);

        } else {
            this.child = newChild;

        }
    }

    get hasChildren () {
        return this.child != null;
    }

    children (): Array<Node<T>> {
        if (!this.hasChildren) { return []; }
        const children: Array<Node<T>> = [];
        let child = this.child;
        while (child != null) {
            children.push(child);
            child = child.sibling;
        }
        return children;
    }

    addSibling (newSibling: Node<T>) {
        if (this.hasSiblings) {
            this.sibling.addSibling(newSibling);

        } else {
            this.sibling = newSibling;

        }
    }

    get hasSiblings() {
        return this.sibling != null;
    }

    mapDepthFirst<X>(action: (T) => X): Array<X> {
        const results: Array<X> = []
        const todo: Array<Node<T>> = [this]
        while (todo.length > 0) {
            const current = todo.pop()
            results.push(action(current.item));
            if (current.hasChildren) {
                for (const eachChild of current.children().reverse()) {
                    todo.push(eachChild);
                }
            }
        }
        return results;
    }

    mapDFSRecursive<X>(accumulator: Array<T>, action: (T) => X) {
        accumulator.push(action(this.item));
        for (const eachChild of this.children()) {
            eachChild.mapDFSRecursive(accumulator, action);
        }
    }

    mapBreadthFirst<X>(action: (T) => X): Array<X> {
        const results: Array<X> = []
        const todo: Array<Node<T>> = [this]
        while (todo.length > 0) {
            const current = todo.shift()
            results.push(action(current.item));
            if (current.hasChildren) {
                for (const eachChild of current.children()) {
                    todo.push(eachChild);
                }
            }
        }
        return results;
    }

    mapBFSRecursive<X>(accumulator: Array<T>, action: (T) => X) {
        accumulator.push(action(this.item))
        if (this.hasSiblings) {
            this.sibling.mapBFSRecursive(accumulator, action);
        }
        if (this.hasChildren) {
            this.child.mapBFSRecursive(accumulator, action);
        }
    }

}


// Create a tree like (r, A, (n1, B, C), (n2, D, (n3, E, F, G), H))

// const nH = new Node<string>("H");
// const nG = new Node<string>("G");
// const nF = new Node<string>("F", null, nG);
// const nE = new Node<string>("E", null, nF);
// const n3 = new Node<string>("n3", nE, nH);

// const nD = new Node<string>("D", null, n3);
// const n2 = new Node<string>("n2", nD, null);

// const nC = new Node<string>("C", null, null);
// const nB = new Node<string>("B", null, nC);
// const n1 = new Node<string>("n1", nB, n2)

// const nA = new Node<string>("A", null, n1);

// const root = new  Node<string>("root", nA);

const nD = new Node<string>("D");
const nG = new Node<string>("G");
const nH = new Node<string>("H");
const nF = new Node<string>("F", nH, nG);
const nC = new Node<string>("C", nF, nD);
const nE = new Node<string>("E")
const nB = new Node<string>("B", nE, nC);
const nA = new Node<string>("A", nB, null);

const root = nA;

console.log("DFS Iterative")
console.log(root.mapDepthFirst((s) => s))

console.log("----");
console.log("DFS Recursive")
let result: string[] = []
root.mapDFSRecursive(result, (s) => s);
console.log(result);

console.log("----");
console.log("BFS Iterative")
console.log(root.mapBreadthFirst((s) => s))

console.log("----");
console.log("BFS Recursive")
result = []
root.mapBFSRecursive(result, (s) => s);
console.log(result);
