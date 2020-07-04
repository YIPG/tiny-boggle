export class TrieNode {
  key: string | null
  children: {
    [key: string]: TrieNode
  }
  end: boolean
  constructor(key: string | null) {
    this.key = key
    this.children = {}
    this.end = false
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
      }
      node = node.children[char]
      if (idx == word.length - 1) {
        node.end = true
      }
    })
  }
}
