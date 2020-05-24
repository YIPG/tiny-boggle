import { AppProps } from "next/app"
import "../styles/index.css"
import { WordProvider, useWordSetting } from "../logic/wordContext"
import { BoardProvider, useBoardSetting } from "../logic/boardContext"

function MyApp({ Component, pageProps }: AppProps) {
  const wordSetting = useWordSetting()
  const boardSetting = useBoardSetting()
  return (
    <WordProvider value={wordSetting}>
      <BoardProvider value={boardSetting}>
        <Component {...pageProps} />
      </BoardProvider>
    </WordProvider>
  )
}

export default MyApp
