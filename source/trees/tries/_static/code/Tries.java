abstract class PrefixTree {

    private final char _key;

    constructor(char key) {
        this._key = key
    }

    char key() {
        return this._key
    }

    abstract String[] lookup(String prefix);

    abstract void insert(String word);

    abstract void remove(String word);

}


class Branch extends PrefixTree {

    private List<PrefixTree> children;



}


class Leaf extends PrefixTree {

    private final String word;

    constructor(char key, String word) {
        super(key);
        this._word = word
    }

    lookup(String prefix) {

    }

}


