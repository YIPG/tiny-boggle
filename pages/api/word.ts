import { NextApiRequest, NextApiResponse } from "next"

import fs from "fs"
import path from "path"
import getConfig from "next/config"
import { Trie } from "../../utils/trie"

const { serverRuntimeConfig } = getConfig()

//
const dictionaryPath = path.join(
  serverRuntimeConfig.PROJECT_ROOT,
  "./assets/dictionary.json"
)

const fileName = fs.readFileSync(dictionaryPath, "utf-8")
const allWords: string[] = JSON.parse(fileName)
const trie = new Trie()
allWords.forEach((word) => {
  trie.insert(word)
})

export default (req: NextApiRequest, res: NextApiResponse) => {
  const word: string = req.body
  const ok = trie.contain(word)
  res.send(ok ? word : "0")
}
