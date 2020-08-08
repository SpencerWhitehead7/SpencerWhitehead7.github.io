const banner = document.getElementById(`banner`)

const generateDisplayStringsFactory = strings => {
  let stringIndex = 0

  return () => new Promise((resolve, _) => {
    const letterIndexArr = strings[stringIndex].split(``).map((letter, index) => ({ letter, index }))

    for (let i = 0; i < letterIndexArr.length; i++) {
      const lastUnshuffledIndex = letterIndexArr.length - 1 - i
      const lastUnshuffledElement = letterIndexArr[lastUnshuffledIndex]
      const shuffledIndex = Math.floor(Math.random() * (letterIndexArr.length - i))
      const shuffledElement = letterIndexArr[shuffledIndex]
      letterIndexArr[shuffledIndex] = lastUnshuffledElement
      letterIndexArr[lastUnshuffledIndex] = shuffledElement
    }

    const blankArr = new Array(letterIndexArr.length).fill(` `)
    const partialStrings = [blankArr.join(``)]
    letterIndexArr.forEach(({ letter, index }) => {
      blankArr[index] = letter
      partialStrings.push(blankArr.join(``))
    })

    stringIndex = (stringIndex + 1) % strings.length

    resolve(partialStrings)
  })
}

const animate = (framesToWait, ...fnsToRunOnCompletion) => {
  const controlFrameRate = (framesWaited, resolve) => {
    if (framesWaited === framesToWait) {
      [...fnsToRunOnCompletion, resolve].forEach(fn => { fn() })
    } else {
      requestAnimationFrame(() => controlFrameRate(framesWaited + 1, resolve))
    }
  }

  return new Promise((resolve, _) => requestAnimationFrame(() => controlFrameRate(0, resolve)))
}

const animateString = async (element, options, displayStrings, displayStringIndex = 0, isIncreasing = true) => {
  const { baseStr = ``, letterInterval = 12, displayFull = 120, displayBlank = 60 } = options

  if (displayStringIndex === -1) {
    await animate(displayBlank)
    return
  }

  const updateElement = () => { element.innerText = `${baseStr}${displayStrings[displayStringIndex]}` }
  await animate(letterInterval, updateElement)

  if (displayStringIndex === displayStrings.length - 1) {
    await animate(displayFull)
    isIncreasing = false
  }

  isIncreasing ? displayStringIndex++ : displayStringIndex--

  return animateString(element, options, displayStrings, displayStringIndex, isIncreasing)
}

const runAnimation = async (element, strings, options = {}) => {
  const generateDisplayStrings = generateDisplayStringsFactory(strings)
  let displayStrings = await generateDisplayStrings()

  while (true) {
    ([displayStrings] = await Promise.all([generateDisplayStrings(), animateString(element, options, displayStrings)]))
  }
}

runAnimation(
  banner,
  [
    `Spencer Whitehead`,
    `a full stack software engineer`,
    `learning and developing every day`,
    `someone who loves programming enough to make this ridiculous animation`,
  ],
  {
    baseStr: `Hi, I'm `,
    letterInterval: 12,
    displayBlank: 60,
    displayFull: 120,
  },
)
