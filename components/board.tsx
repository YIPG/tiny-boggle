import { useState } from "react"
import Dice from "./dice"
import { useBoardSettingCtx } from "../logic/boardContext"

export default function board() {
  const { boardSetting } = useBoardSettingCtx()
  const { chars } = boardSetting
  return (
    <div className="grid grid-cols-4 w-64 h-64 result">
      {chars.map((char, idx) => {
        return <Dice key={idx} idx={idx} char={char} />
      })}
    </div>
  )
}
