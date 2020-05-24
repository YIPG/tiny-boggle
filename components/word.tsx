import { useWordSettingCtx } from "../logic/wordContext"

export default function Word() {
  const { wordSetting } = useWordSettingCtx()
  const { word, isValid } = wordSetting
  const style = (mode: "default" | "valid" | "inValid") => {
    switch (mode) {
      case "inValid":
        return "word word-text word-incorrect"
      case "valid":
        return "word word-text word-correct"
      case "default":
        return "word word-text"
    }
  }
  return <span className={style(isValid)}>{word}</span>
}
