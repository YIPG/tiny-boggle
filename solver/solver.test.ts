import { bluteForceSolver } from "./blute_force_solver"
import { trieSolver } from "./trie_solver"
import { promises as fs } from "fs"
import path from "path"

describe("Solver Test", () => {
  let chars: string[], dictionary: string[]
  beforeAll(async () => {
    chars = [
      "E",
      "A",
      "D",
      "O",
      "M",
      "Y",
      "N",
      "M",
      "U",
      "E",
      "V",
      "U",
      "A",
      "G",
      "S",
      "R",
    ]
    const dictionaryPath = path.join(process.cwd(), "assets/dictionary.json")
    dictionary = JSON.parse(await fs.readFile(dictionaryPath, "utf-8"))
  })

  test("Blute Force Solver returns collect answer", () => {
    const ans = bluteForceSolver(dictionary, chars)
    expect(ans.length).toBe(28)
  })

  test("Trie Solver returns collect answer", () => {
    const ans = trieSolver(dictionary, chars)
    expect(ans.length).toBe(28)
  })
})
