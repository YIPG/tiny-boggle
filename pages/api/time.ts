import { NextApiRequest, NextApiResponse } from "next"

import { bluteForceSolver } from "../../solver/blute_force_solver"
import { trieSolver } from "../../solver/trie_solver"

import fs from "fs"
import path from "path"
import { performance, PerformanceObserver } from "perf_hooks"

const dictionaryPath = path.join(process.cwd(), "assets/dictionary.json")

const fileName = fs.readFileSync(dictionaryPath, "utf-8")
const dictionary: string[] = JSON.parse(fileName)

export default (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body)
  const solverType: string = body.solver
  if (!["trie", "bluteforce"].includes(solverType)) {
    res.status(400).send("invalid solver type🚫")
    return
  }
  const chars: string[] = body.chars

  // performance measure. if interested, please check https://nodejs.org/api/perf_hooks.html#perf_hooks_performanceobserver_observe_options
  let mainTaskMilliSeconds = 0
  let trieInsertMillSeconds = 0
  const obs = new PerformanceObserver((list) => {
    const mainTask = list.getEntriesByName("main")[0]
    const trieInsertTask = list.getEntriesByName("trie_insert")[0]

    if (mainTask) {
      mainTaskMilliSeconds = mainTask.duration
    }
    if (trieInsertTask) {
      trieInsertMillSeconds = trieInsertTask.duration
    }
  })
  obs.observe({ entryTypes: ["measure"] })
  // perf part ends

  const words =
    solverType === "trie"
      ? trieSolver(dictionary, chars, performance)
      : bluteForceSolver(dictionary, chars, performance)

  res.json({
    words,
    mainTaskMilliSeconds,
    trieInsertMillSeconds,
  })
}
