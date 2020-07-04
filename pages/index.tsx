import { useEffect, useState } from "react"
import Header from "../components/header"
import Nav from "../components/nav"
import Board from "../components/board"
import Word from "../components/word"
import { AnswerButton } from "../components/answerButton"
import { useBoardSettingCtx } from "../logic/boardContext"
import { getChars } from "../utils/getChars"

export default function IndexPage() {
  const { initBoard } = useBoardSettingCtx()
  const [chars, setChars] = useState<string[]>(new Array(16).fill(""))
  useEffect(() => {
    const chars = getChars()
    setChars(chars)
    initBoard(chars)
  }, [])

  return (
    <>
      <Header
        title="Tiny Boggle 🎲"
        keyword="Boggle"
        description="Tiny 60kb Boggle built with Next.js. Enjoy playing! 🚀"
        image="https://boggle.yuyaito.dev/share.png"
        url="https://boggle.yuyaito.dev/"
      />
      <Nav />
      <div className="flex justify-center">
        <Word />
      </div>

      <div className="mt-6 flex justify-center">
        <Board />
      </div>

      <div className="my-10 flex flex-col items-center">
        <AnswerButton solverType="trie" chars={chars} />
        <AnswerButton solverType="bruteforce" chars={chars} />
      </div>
    </>
  )
}
