import randomInt from "./randomInt"

const charsList = new Array(
  "ARELSC",
  "TABIYL",
  "EDNSWO",
  "BIOFXR",
  "MCDPAE",
  "IHFYEE",
  "KTDNUO",
  "MOQAJB",
  "ESLUPT",
  "INVTGE",
  "ZNDVAE",
  "UKGELY",
  "OCATAI",
  "ULGWIR",
  "SPHEIN",
  "MSHARO"
)

export function getChars() {
  return charsList.map((chars) => chars[randomInt(0, 5)])
}
