class TrieNode {
  key: string | null
  parent: TrieNode | null
  children: {
    [key: string]: TrieNode
  }
  end: boolean
  constructor(key: string | null) {
    this.key = key
    this.parent = null
    this.children = {}
    this.end = false
  }

  getWord() {
    var output = []
    var node = this as TrieNode | null

    while (node !== null) {
      output.unshift(node.key)
      node = node.parent
    }

    return output.join("")
  }
}
export class Trie {
  root: TrieNode
  constructor() {
    this.root = new TrieNode(null)
  }
  public insert(word: string) {
    let node = this.root
    word.split("").forEach((char, idx) => {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(char)
        node.children[char].parent = node
      }
      node = node.children[char]
      if (idx == word.length - 1) {
        node.end = true
      }
    })
  }
  public contain(word: string) {
    let node = this.root
    const ok = word.split("").every((char) => {
      if (node.children[char]) {
        node = node.children[char]
        return true
      } else {
        return false
      }
    })
    return ok && node.end
  }
  public find(prefix: string) {
    let node = this.root
    let output: string[] = []
    prefix.split("").forEach((char) => {
      if (node.children[char]) {
        node = node.children[char]
      } else {
        return output
      }
    })
    this.findAllWords(node, output)

    return output
  }

  private findAllWords(node: TrieNode, arr: string[]) {
    if (node.end) {
      arr.unshift(node.getWord())
    }

    Object.keys(node.children).forEach((key) => {
      this.findAllWords(node.children[key], arr)
    })
  }
}
