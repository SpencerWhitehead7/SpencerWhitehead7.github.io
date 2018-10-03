{
  // Base element
  const banner = document.getElementById(`banner`)

  // Used to cancel all scheduled timeouts and loops when page loses focus
  let singleTimeouts = []
  let loopTimeouts = []

  // Adds/removes one character to/from base string each time it runs. If it has run fewer times than the length of the string being altered (excluding blank spaces, for easier random selection of characters to replace), it calls itself again after a delay of speed ms.
  const fillOrRemoveChars = (counter, loopLength, baseStr, blanks, domEle, speed, endStr) => {
    if(counter < loopLength){ // ends chain of setTimeout()s if every letter has been replaced
      const oldBlanks = blanks.join(``)
      while(oldBlanks === blanks.join(``)){ // tests characters to add/remove at random until it brute-force hits one that hasn't been replaced yet
        const index = Math.floor(Math.random() * blanks.length)
        blanks[index] = endStr !== undefined ? endStr[index] : ` ` // replaces with correct letter from input string if adding, blank space if removing
      }

      const newHTML = `<h1>
          ${baseStr}
          ${blanks
    .join(``)
    .trimEnd()
    .split(` `)
    .join(`${String.fromCharCode(160)}<wbr>`)}
          </h1>` // amazingly enough, this was the simplest way to get new-lineable spaces of the same width as a regular letter into the string
      domEle.innerHTML = newHTML
      counter++

      singleTimeouts.push(setTimeout(() => fillOrRemoveChars(counter, loopLength, baseStr, blanks, domEle, speed, endStr), speed)) // Calls itself again after speed ms pause
    }
  }

  // Called once per string to display; invokes fillOrRemoveChars (in fill mode) immediately, waits for animation to finish, calls fillOrRemoveChars again (in remove mode) to clear the string
  const generateStr = (endStr, domEle, speed, dispTime, loopLength, baseStr = ``) => {
    const blanks = new Array(endStr.length).fill(` `) // creates the array functions will fill with the str and empty
    fillOrRemoveChars(0, loopLength, baseStr, blanks, domEle, speed, endStr)
    singleTimeouts.push(setTimeout(() => fillOrRemoveChars(0, loopLength, baseStr, blanks, domEle, speed), (speed * loopLength) + dispTime)) // timer based on how long it takes the fill animation to fill in every non-space character and wait a to display them
  }

  // Calls generateStr once for each passed-in display string. All the calls are initialized at once, but execute after a delay calculated to fit the animation
  const bannerGimmick = (domEle, speed, dispTime, blankTime, ...rest) => {
    const baseStr = domEle.innerText
    let timer = 0
    for(let i = 0; i < rest.length; i++){
      const endStr = rest[i]
      const loopLength = endStr.split(``).filter(char => char !== ` `).length
      singleTimeouts.push(setTimeout(() => generateStr(endStr, domEle, speed, dispTime, loopLength, baseStr), timer))
      timer += (speed * loopLength * 2) + dispTime + blankTime // timer is based on how long it takes generateStr to go through a full cycle
    }
    // console.log((rest.length * (dispTime + blankTime)) + (rest.join(``).length * speed)) // use to find APPROXIMATE (and on the small side) amount of time for setInterval if you change the input strings
  }

  // Utility function to just run the bannerGimmick with my preferred inputs
  const runAnimation = () => bannerGimmick(banner, 50, 2000, 500,
    `Spencer Whitehead`,
    `a Full Stack Software Engineer`,
    `someone who loves programming`,
    `always learning and developing my skills`)

  // Utility function to loop bannerGimmick with my preferred inputs and clear the timeouts (all the scheduled ones should already by complete)
  const loopAnimation = fullLoopTime => setInterval(() => {
    runAnimation()
    singleTimeouts = []
  }, fullLoopTime)

  // Invoked as soon as the page loads to run animation once and start the loop
  runAnimation()
  loopTimeouts.push(loopAnimation(20000))

  // Ends/restarts animation when window loses/gains focus. The text quickly turns to slush without this due to browser behavior on focus change
  const endOrRestartAnimation = () => {
    if(document.hidden){ // loses focus; cancels the animation loop, cancels all already scheduled animation timeouts and loops, resets banner HTML
      loopTimeouts.forEach(timeout => clearInterval(timeout))
      singleTimeouts.forEach(timeout => clearTimeout(timeout))
      loopTimeouts = []
      singleTimeouts = []
      banner.innerHTML = `<h1>Hi,&nbsp;<wbr>I'm</h1>`
    }else{ // gains focus; runs the animation once and restarts the loop
      runAnimation()
      loopTimeouts.push(loopAnimation(20000))
    }
  }

  // Actually listens for gaining/losing focus, calls handleChange function
  document.addEventListener(`visibilitychange`, endOrRestartAnimation, false)
}
