export const split = (array: string[], n: number) =>
  array.reduce(
    (a: string[][], c, i) =>
      i % n === 0
        ? [...a, [c.toLowerCase()]]
        : [...a.slice(0, -1), [...a[a.length - 1], c.toLowerCase()]],
    []
  )
