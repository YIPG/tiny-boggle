import { useState } from "react"
import { createCtx } from "../utils/createCtx"

type ContextProps = {
  wordSetting: WordSettingState
  setWord: (word: string) => void
  fetchIsValid: () => Promise<void>
  setIsValid: (isValid: "default" | "valid" | "inValid") => void
  addChar: (char: string) => void
  resetWord: () => void
}

type WordSettingState = {
  word: string
  isValid: "default" | "valid" | "inValid"
}

export function useWordSetting() {
  const initialState: WordSettingState = {
    word: "",
    isValid: "default",
  }

  const [wordSetting, setWordSetting] = useState(initialState)

  const setWord = (word: string) => {
    setWordSetting((prev) => {
      return {
        ...prev,
        word,
      }
    })
  }

  const addChar = (char: string) => {
    setWordSetting((prev) => {
      return {
        ...prev,
        word: prev.word + char,
      }
    })
  }

  const resetWord = () => {
    setWordSetting((prev) => {
      return {
        ...prev,
        word: "",
      }
    })
  }

  const fetchIsValid = async () => {
    const { word } = wordSetting
    const res = await fetch("/api/word", {
      method: "POST",
      body: word.toLowerCase(),
    })

    const text: string = await res.text()
    console.log(text)
    setWordSetting((prev) => {
      return {
        ...prev,
        isValid: text == word.toLowerCase() ? "valid" : "inValid",
      }
    })
  }

  const setIsValid = (isValid: "default" | "valid" | "inValid") => {
    setWordSetting((prev) => {
      return {
        ...prev,
        isValid,
      }
    })
  }

  return {
    wordSetting,
    setWord,
    addChar,
    resetWord,
    fetchIsValid,
    setIsValid,
  } as const
}

export const [useWordSettingCtx, WordProvider] = createCtx<ContextProps>()
