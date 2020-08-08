const banner = document.getElementById(`banner`)

const generateDisplayStringsFactory = strings => {
  let stringIndex = 0

  return () => {
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

    return partialStrings
  }
}

const animate = (framesToWait, ...fnsToRunOnCompletion) => {
  const controlFrameRate = framesWaited => {
    if (framesWaited === framesToWait) {
      fnsToRunOnCompletion.forEach(fn => { fn() })
    } else {
      requestAnimationFrame(() => controlFrameRate(framesWaited + 1))
    }
  }

  requestAnimationFrame(() => controlFrameRate(0))
}

const randomLettersApperator = async (element, strings, options = {}) => {
  const { baseStr = ``, letterInterval = 100, displayBlank = 500, displayFull = 100 } = options

  const generateDisplayStrings = generateDisplayStringsFactory(strings)

  let displayStrings = generateDisplayStrings()

  while (true) {
    const displayCurrString = new Promise(async (resolve, _) => {
      let letterIndex = 0
      let isIncreasing = true

      while (letterIndex !== -1) {
        await new Promise((resolve, _) => {
          const updateElement = () => { element.innerText = `${baseStr}${displayStrings[letterIndex]}` }
          animate(letterInterval, updateElement, resolve)
        })

        if (letterIndex === displayStrings.length - 1) {
          isIncreasing = false

          await new Promise((resolve, _) => {
            animate(displayFull, resolve)
          })
        }
        isIncreasing ? letterIndex++ : letterIndex--
      }
      resolve()
    })

    const shuffleNextString = new Promise((resolve, _) => {
      resolve(generateDisplayStrings())
    })

    const [shuffledNextString] = await Promise.all([shuffleNextString, displayCurrString])
    displayStrings = shuffledNextString

    await new Promise((resolve, _) => {
      animate(displayBlank, resolve)
    })
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
