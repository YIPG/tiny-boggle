import { useEffect, MouseEvent, useState } from "react"
import { useBoardSettingCtx } from "../logic/boardContext"
import { useWordSettingCtx } from "../logic/wordContext"

export default function Dice({ char, idx }: { char: string; idx: number }) {
  const {
    boardSetting,
    setIsDrawing,
    resetActiveDiceList,
    updateActiveDiceList,
  } = useBoardSettingCtx()

  const { addChar, resetWord, fetchIsValid, setIsValid } = useWordSettingCtx()

  const { isDrawing, activeDiceList } = boardSetting

  const handleMouseDown = (e: MouseEvent) => {
    resetWord()
    updateActiveDiceList(idx)
    setIsDrawing(true)
    setIsValid("default")
    addChar(char)
  }
  const handleMouseMove = (e: MouseEvent) => {
    if (isDrawing && !activeDiceList[idx]) {
      updateActiveDiceList(idx)
      addChar(char)
    }
  }
  const handleMouseUp = (e: MouseEvent) => {
    resetActiveDiceList()
    setIsDrawing(false)
    fetchIsValid()
  }
  const diceStyle = () => {
    const base = "dice dice-text m-1"
    return activeDiceList[idx] ? `${base} dice-active` : base
  }
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseMove}
      className={diceStyle()}
    >
      {char}
    </div>
  )
}
