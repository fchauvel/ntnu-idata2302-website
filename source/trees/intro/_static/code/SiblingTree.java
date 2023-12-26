public class SiblingTree<T> {

    private Node<T> root;

    public SiblingTree<T>() {

    }

    public int depth
}


class Node<T> {

    private Node<T> nextSibling;
    private Node<T> firstChild;

    private Node<T>(Node<T> nextSibling, Node<T> firstChild) {
        this.nextSibling = nextSibling;
        this.firstChild = firstChild
    }

    void appendChild(Node<T> newChild) {
        if (hasChildren()) {
            this.firstChild.appendSibling(newChild);
        } else {
            this.firstChild = newChild
        }
    }

    boolean hasChildren() {
        return this.firstChild != null;
    }

    void appendSibling(Node<T> newSibling) {
        if (hasSiblings()) {
            this.nextSibling.append(newSibling);
        } else {
            this.nextSibling = newSibling;
        }
    }

    boolean hasSiblings() {
        return nextSibling != null;
    }

}
