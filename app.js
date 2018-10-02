{
  // BUTTON CONTROLS START

  const projectButtons = document.getElementById(`project-buttons`)

  const projectsHeader = document.getElementById(`projects-header`)

  projectButtons.addEventListener(`click`, evt => {
    evt.stopPropagation()
    const ele = document.getElementById(evt.target.parentElement.value)
    if(ele){ // deals with the weird edge case where the button floats up and the clicked ele registers as null and everything else errors out
      projectsHeader.scrollIntoView(true)
      projectButtons.classList.add(`gone`)
      ele.classList.remove(`gone`)
      ele.classList.add(`visible`)
      setTimeout(() => ele.classList.remove(`hidden`), 1)
    }
  })

  document.getElementsByTagName(`body`)[0].addEventListener(`click`, () => {
    const visibles = [...document.getElementsByClassName(`visible`)]
    if(visibles.length > 0){
      projectsHeader.scrollIntoView(true)
      visibles.forEach(ele => {
        ele.classList.remove(`visible`)
        ele.classList.add(`hidden`)
        setTimeout(() => ele.classList.add(`gone`), 250)
        setTimeout(() => projectButtons.classList.remove(`gone`), 250)
      })
    }
  })

  // BUTTON CONTROLS END

  // GIMMICKY HEADER START

  const banner = document.getElementById(`banner`)

  const fillOrRemoveChars = (counter, loopLength, baseStr, blanks, domEle, speed, endStr) => {
    if(counter < loopLength){
      const oldBlanks = blanks.join(``)
      while(oldBlanks === blanks.join(``)){
        const index = Math.floor(Math.random() * blanks.length)
        blanks[index] = endStr === undefined ? ` ` : endStr[index]
      }
      const newText = `${baseStr}${blanks.join(``).trimEnd()}`
      const newHTML = `<h1>${newText.split(` `).join(`<span>${String.fromCharCode(8194)}</span>`)}</h1>`
      domEle.innerHTML = newHTML
      console.log(newText)
      counter++
      setTimeout(() => fillOrRemoveChars(counter, loopLength, baseStr, blanks, domEle, speed, endStr), speed)
    }
  }

  const generateStr = (endStr, domEle, speed, dispTime, loopLength, baseStr = ``) => {
    const blanks = new Array(endStr.length).fill(` `)
    fillOrRemoveChars(0, loopLength, baseStr, blanks, domEle, speed, endStr)
    setTimeout(() => fillOrRemoveChars(0, loopLength, baseStr, blanks, domEle, speed), (speed * loopLength) + dispTime)
  }

  const bannerGimmick = (domEle, speed, dispTime, blankTime, ...rest) => {
    const baseStr = domEle.innerText
    let timer = 0
    for(let i = 0; i < rest.length; i++){
      const endStr = rest[i]
      const loopLength = endStr.split(``).filter(char => char !== ` `).length
      setTimeout(() => generateStr(endStr, domEle, speed, dispTime, loopLength, baseStr), timer)
      timer += (speed * loopLength * 2) + dispTime + blankTime
    }
  }

  bannerGimmick(banner, 50, 2000, 500,
    `Spencer Whitehead`,
    `a Full Stack Software Engineer`,
    `someone who loves programming`,
    `always learning and growing my skills`)

  // GIMMICKY HEADEAR END
}
