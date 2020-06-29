import { NextApiRequest, NextApiResponse } from "next"

import fs from "fs"
import path from "path"

const dictionaryPath = path.join(process.cwd(), "assets/dictionary.json")

const fileName = fs.readFileSync(dictionaryPath, "utf-8")
const allWords: string[] = JSON.parse(fileName)

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const word: string = req.body
        const ok = allWords.includes(word)
        res.send(ok)
    }
}
