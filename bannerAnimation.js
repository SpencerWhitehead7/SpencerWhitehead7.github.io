const banner = document.getElementById(`banner`)

const stringProcessor = string => string.split(``).map((letter, index) => ({ letter, index }))

const shuffler = arr => {
  for (let i = 0; i < arr.length; i++) {
    const lastUnshuffledIndex = arr.length - 1 - i
    const lastUnshuffledElement = arr[lastUnshuffledIndex]
    const shuffledIndex = Math.floor(Math.random() * (arr.length - i))
    const shuffledElement = arr[shuffledIndex]
    arr[shuffledIndex] = lastUnshuffledElement
    arr[lastUnshuffledIndex] = shuffledElement
  }
  return arr
}

const displayer = arr => {
  const blankArr = new Array(arr.length).fill(` `)
  const results = [blankArr.join(``)]
  arr.forEach(({ letter, index }) => {
    blankArr[index] = letter
    results.push(blankArr.join(``))
  })
  return results
}

const randomLettersApperator = async (element, strings, options = {}) => {
  const { baseStr = ``, letterInterval = 100, displayBlank = 500, displayFull = 100 } = options

  let stringIndex = 0
  let currString = strings[stringIndex]

  let partialStringsToDisplay = displayer(shuffler(stringProcessor(currString)))

  let framesWaited = 1
  const animator = (framesToWait, fnsToRunOnCompletion) => {
    const animationFn = () => {
      if (framesWaited === framesToWait) {
        framesWaited = 1
        const empty = [] // errors on [].concat for reasons
        empty.concat(fnsToRunOnCompletion).forEach(fn => { fn() })
      } else {
        framesWaited++
        requestAnimationFrame(animationFn)
      }
    }
    requestAnimationFrame(animationFn)
  }

  while (true) {
    const displayCurrString = new Promise(async (resolve, _) => {
      let letterIndex = 0
      let isIncreasing = true

      while (letterIndex !== -1) {
        await new Promise((resolve, _) => {
          const updateElement = () => { element.innerText = `${baseStr}${partialStringsToDisplay[letterIndex]}` }
          animator(letterInterval, [updateElement, resolve])
        })

        if (letterIndex === partialStringsToDisplay.length - 1) {
          isIncreasing = false

          await new Promise((resolve, _) => {
            animator(displayFull, resolve)
          })
        }
        isIncreasing ? letterIndex++ : letterIndex--
      }
      resolve()
    })

    const shuffleNextString = new Promise((resolve, _) => {
      stringIndex = (stringIndex + 1) % strings.length
      currString = strings[stringIndex]
      resolve(displayer(shuffler(stringProcessor(currString))))
    })

    const [shuffledNextString] = await Promise.all([shuffleNextString, displayCurrString])
    partialStringsToDisplay = shuffledNextString

    await new Promise((resolve, _) => {
      animator(displayBlank, resolve)
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
