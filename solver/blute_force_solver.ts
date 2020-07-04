import { split } from "../utils/split"
import { Performance } from "perf_hooks"

export const bruteforceSolver = (
  words: string[],
  chars: string[],
  performance?: Performance
): string[] => {
  const board = split(chars, 4)
  let res = new Set<string>()
  performance?.mark("main task starts")
  for (const word of words) {
    for (const [y, _] of board.entries()) {
      for (const [x, char] of _.entries()) {
        if (digIntoCallStack(word, 0, board, x, y)) {
          res.add(word)
        }
      }
    }
  }
  performance?.mark("main task ends")
  performance?.measure("main", "main task starts", "main task ends")
  return Array.from(res)
}

const digIntoCallStack = (
  word: string,
  idx: number,
  board: string[][],
  x: number,
  y: number
): boolean => {
  if (x < 0 || x >= board[0].length || y < 0 || y >= board.length) {
    return false
  }

  const tmp = board[y][x]
  if (idx === word.length - 1 && word.slice(idx) === tmp) {
    return true
  }
  board[y][x] = "*"
  let flag: boolean = false
  if (word[idx] === tmp) {
    flag = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ].some(([dx, dy]) => digIntoCallStack(word, idx + 1, board, x + dx, y + dy))
  }
  board[y][x] = tmp

  return flag
}
