import { split } from "../utils/split"

import { Trie, TrieNode } from "../utils/trie"
import { Performance } from "perf_hooks"

export const trieSolver = (
  words: string[],
  chars: string[],
  performance?: Performance
): string[] => {
  const trie = new Trie()
  const board = split(chars, 4)
  performance?.mark("trie insert starts")
  for (const word of words) {
    trie.insert(word)
  }
  performance?.mark("trie insert ends")
  performance?.measure("trie_insert", "trie insert starts", "trie insert ends")

  const node = trie.root
  let res: string[] = []
  performance?.mark("main task starts")
  for (const [y, _] of board.entries()) {
    for (const [x] of _.entries()) {
      dfs(board, node, x, y, res, "")
    }
  }
  performance?.mark("main task ends")
  performance?.measure("main", "main task starts", "main task ends")

  return res.sort()
}

const dfs = (
  board: string[][],
  node: TrieNode,
  x: number,
  y: number,
  res: string[],
  path: string
): void => {
  if (node.end) {
    res.push(path)
    node.end = false
  }
  if (x < 0 || x >= board[0].length || y < 0 || y >= board.length) {
    return
  }
  const tmp = board[y][x]
  node = node.children[tmp]
  if (!node) {
    return
  }
  board[y][x] = "*"
  const d = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  d.forEach(([dx, dy]) => dfs(board, node, x + dx, y + dy, res, path + tmp))
  board[y][x] = tmp
}
