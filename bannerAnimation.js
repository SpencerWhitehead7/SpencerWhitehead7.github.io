const banner = document.getElementById(`banner`)

const scramble = str => {
  const scrambled = str.split(``).map((letter, idx) => ({ letter, idx }))

  for (let i = 0; i < scrambled.length; i++) {
    const lastUnshuffledI = scrambled.length - 1 - i
    const lastUnshuffledE = scrambled[lastUnshuffledI]
    const shuffledI = Math.floor(Math.random() * (scrambled.length - i))
    const shuffledE = scrambled[shuffledI]
    scrambled[shuffledI] = lastUnshuffledE
    scrambled[lastUnshuffledI] = shuffledE
  }

  return scrambled
}

const waitFrames = framesToWait => {
  const wait = (framesWaited, resolve) => {
    framesWaited === framesToWait
      ? resolve()
      : requestAnimationFrame(() => { wait(framesWaited + 1, resolve) })
  }

  return new Promise((resolve, _) => { wait(0, resolve) })
}

const animateString = async (element, displayStrs, options = {}) => {
  displayStrs = displayStrs.filter(str => str.length)
  if (!displayStrs.length) return

  const { baseStr = ``, letterInterval = 6, displayEmpty = 60, displayFull = 120 } = options

  let displayStrIdx = 0

  while (true) {
    const displayStr = displayStrs[displayStrIdx]
    const scrambledStr = scramble(displayStr)
    const partialStrs = Array(displayStr.length).fill(` `)

    for (let i = 0; i < displayStr.length; i++) {
      await waitFrames(letterInterval)
      const { letter, idx } = scrambledStr[i]
      partialStrs[idx] = letter
      element.innerText = baseStr + partialStrs.join(``)
    }

    await waitFrames(Math.max(displayFull - letterInterval, 0))

    for (let i = displayStr.length - 1; i >= 0; i--) {
      await waitFrames(letterInterval)
      const { idx } = scrambledStr[i]
      partialStrs[idx] = ` `
      element.innerText = baseStr + partialStrs.join(``)
    }

    await waitFrames(Math.max(displayEmpty - letterInterval, 0))

    displayStrIdx = (displayStrIdx + 1) % displayStrs.length
  }
}

animateString(
  banner,
  [
    `Spencer Whitehead`,
    `a full stack software engineer`,
    `learning and developing every day`,
    `someone who loves programming enough to make this ridiculous animation`,
  ],
  {
    baseStr: `Hi, I'm `,
  },
)
