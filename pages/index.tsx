import { useEffect } from "react"
import Header from "../components/header"
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
      <Header
        title="Boggle"
        keyword="Boggle"
        description="Tiny 60kb Boggle"
        image="/share.png"
        url="https://boggle.yuyaito.dev/"
      />
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
