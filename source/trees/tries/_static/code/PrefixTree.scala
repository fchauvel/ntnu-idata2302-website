

class PrefixTree(val key: Char)

class Leaf(key: Char, val word: String) extends PrefixTree(key)

class Branch(key: Char, var children: Array[PrefixTree]) extends PrefixTree(key)

@main
def test =
    println("Hi, there!")
    val tree = new Leaf('a', "apple")
    println(tree.key)
    println(tree.word)

