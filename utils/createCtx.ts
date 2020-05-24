import React from "react"

export function createCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined)
  function useCtx() {
    const c = React.useContext(ctx)
    if (!c) throw new Error("useCtx must be inside a Provider with a value")
    return c
  }
  return [useCtx, ctx.Provider] as const // make TypeScript infer a tuple, not an array of union types
}
