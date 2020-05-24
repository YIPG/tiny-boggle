import { useEffect } from "react"
import Nav from "../components/nav"
import Board from "../components/board"
import Word from "../components/word"
import { useBoardSettingCtx } from "../logic/boardContext"
import { getChars } from "../utils/getChars"

export async function getStaticProps() {
  const chars = getChars()
  return {
    props: {
      chars,
    },
  }
}

export default function IndexPage({ chars }: { chars: string[] }) {
  const { initBoard } = useBoardSettingCtx()
  useEffect(() => {
    initBoard(chars)
  }, [])
  return (
    <>
      <Nav />
      <div className="flex justify-center">
        <Word />
      </div>

      <div className="mt-6 flex justify-center">
        <Board />
      </div>
    </>
  )
}
