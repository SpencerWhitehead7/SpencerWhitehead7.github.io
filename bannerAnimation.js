const banner = document.getElementById(`banner`)

const shuffle = arr => {
  for (let i = 0; i < arr.length; i++) {
    const lastUnshuffledI = arr.length - 1 - i
    const lastUnshuffledE = arr[lastUnshuffledI]
    const shuffledI = Math.floor(Math.random() * (arr.length - i))
    const shuffledE = arr[shuffledI]
    arr[shuffledI] = lastUnshuffledE
    arr[lastUnshuffledI] = shuffledE
  }
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
  const strScrambles = displayStrs
    .filter(str => str.length)
    .map(str => ({
      scrambled: str.split(``).map((char, idx) => ({ char, idx })),
      partial: str.split(``).fill(` `)
    }))

  if (!strScrambles.length) return

  const { baseStr = ``, letterInterval = 6, displayEmpty = 60, displayFull = 120 } = options

  let displayStrIdx = 0

  while (true) {
    const { scrambled, partial } = strScrambles[displayStrIdx]

    shuffle(scrambled)

    for (let i = 0; i < scrambled.length; i++) {
      await waitFrames(letterInterval)
      const { char, idx } = scrambled[i]
      partial[idx] = char
      element.innerText = baseStr + partial.join(``)
    }

    await waitFrames(Math.max(displayFull - letterInterval, 0))

    for (let i = scrambled.length - 1; i >= 0; i--) {
      await waitFrames(letterInterval)
      const { idx } = scrambled[i]
      partial[idx] = ` `
      element.innerText = baseStr + partial.join(``)
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
