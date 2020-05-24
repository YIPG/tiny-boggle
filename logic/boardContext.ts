import { useState } from "react"
import { createCtx } from "../utils/createCtx"

type ContextProps = {
  boardSetting: boardSettong
  setIsDrawing: (arg: boolean) => void
  updateActiveDiceList: (idx: number) => void
  resetActiveDiceList: () => void
  initBoard: (char: string[]) => void
}

type boardSettong = {
  chars: string[]
  activeDiceList: boolean[]
  isDrawing: boolean
}

export function useBoardSetting() {
  // getChars() just gets board data and it's not so performance heavy. If you mind performance, use getStaticProps in pages/index.tsx

  const initialState = {
    chars: [""],
    activeDiceList: [false],
    isDrawing: false,
  }
  const [boardSetting, setBoardSetting] = useState(initialState)

  const initBoard = (chars: string[]) => {
    setBoardSetting((prev) => {
      return {
        ...prev,
        chars: chars,
        activeDiceList: new Array<boolean>(chars.length).fill(false),
      }
    })
  }

  const setIsDrawing = (arg: boolean) => {
    setBoardSetting((prev) => {
      return {
        ...prev,
        isDrawing: arg,
      }
    })
  }

  const updateActiveDiceList = (idx: number) => {
    setBoardSetting((prev) => {
      return {
        ...prev,
        activeDiceList: [
          ...prev.activeDiceList.slice(0, idx),
          true,
          ...prev.activeDiceList.slice(idx + 1),
        ],
      }
    })
  }

  const resetActiveDiceList = () => {
    setBoardSetting((prev) => {
      return {
        ...prev,
        activeDiceList: new Array<boolean>(boardSetting.chars.length).fill(
          false
        ),
      }
    })
  }

  return {
    boardSetting,
    setIsDrawing,
    updateActiveDiceList,
    resetActiveDiceList,
    initBoard,
  } as const
}

export const [useBoardSettingCtx, BoardProvider] = createCtx<ContextProps>()
