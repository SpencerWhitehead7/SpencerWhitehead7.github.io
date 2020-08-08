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

const randomLettersApperator = async (element, strings, options = {}) => {
  const { baseStr = ``, letterInterval = 100, displayBlank = 500, displayFull = 100 } = options

  const generateDisplayStrings = generateDisplayStringsFactory(strings)

  let displayStrings = await generateDisplayStrings()

  while (true) {
    const displayCurrString = async () => {
      let letterIndex = 0
      let isIncreasing = true

      while (letterIndex !== -1) {
        const updateElement = () => { element.innerText = `${baseStr}${displayStrings[letterIndex]}` }
        await animate(letterInterval, updateElement)

        if (letterIndex === displayStrings.length - 1) {
          isIncreasing = false

          await animate(displayFull)
        }
        isIncreasing ? letterIndex++ : letterIndex--
      }
    }

    ([displayStrings] = await Promise.all([generateDisplayStrings(), displayCurrString()]))

    await animate(displayBlank)
  }
}

randomLettersApperator(
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
