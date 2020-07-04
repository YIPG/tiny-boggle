import { useState } from "react"

interface Ans {
  words: string[]
  mainTaskMilliSeconds: number
  trieInsertMillSeconds: number
}

export const AnswerButton = ({
  solverType = "bruteforce",
  chars,
}: {
  solverType?: string
  chars: string[]
}) => {
  const [ans, setAns] = useState<Ans | null>()
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)
    const res = await fetch("/api/time", {
      method: "POST",
      body: JSON.stringify({
        solver: solverType,
        chars,
      }),
    })

    setAns(await res.json())
    setLoading(false)
  }
  return (
    <div className="flex flex-col items-center w-64 h-76">
      <button
        className="btn-blue text-base w-2/3"
        onClick={onClick}
      >{`${solverType} solver`}</button>
      {!ans && loading && (
        <div className="loader border-2 border-solid border-blue-300 my-auto">
          <div />
        </div>
      )}
      {ans && (
        <div className="my-5 text-gray-800 font-sans text-base leading-loose">
          <p>
            Possible answers are{" "}
            <span className="font-semibold">{ans.words.length}</span>.
          </p>
          <div className="overflow-y-auto border-gray-300 border-2 rounded-md w-64 h-24 break-words py-2 px-5 my-4 leading-loose text-base">
            {ans.words.join("  ")}
          </div>
          {solverType === "trie" && (
            <p>
              Trie insertion needs:{" "}
              <span>{ans.trieInsertMillSeconds.toFixed(2)}</span> ms
            </p>
          )}
          <p>
            Total needs:{" "}
            <span className="font-semibold">
              {(ans.mainTaskMilliSeconds + ans.trieInsertMillSeconds).toFixed(
                2
              )}
            </span>{" "}
            ms
          </p>
        </div>
      )}
    </div>
  )
}
