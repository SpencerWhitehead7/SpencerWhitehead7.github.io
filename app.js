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

  const ensp = String.fromCharCode(8194)

  const fillOrRemoveChars = (counter, loopLength, baseStr, blanks, domEle, speed, endStr) => {
    if(counter < loopLength){
      const oldBlanks = blanks.join(``)
      while(oldBlanks === blanks.join(``)){
        const index = Math.floor(Math.random() * blanks.length)
        blanks[index] = endStr === undefined ? ensp : endStr[index]
      }
      const newText = `${baseStr}${blanks.join(``).trimEnd()}`
      domEle.innerText = newText
      console.log(newText)
      counter++
      setTimeout(() => fillOrRemoveChars(counter, loopLength, baseStr, blanks, domEle, speed, endStr), speed)
    }
  }

  const generateStr = (endStr, domEle, speed, loopLength, baseStr = ``) => {
    const blanks = new Array(endStr.length).fill(ensp)
    fillOrRemoveChars(0, loopLength, baseStr, blanks, domEle, speed, endStr)
    setTimeout(() => fillOrRemoveChars(0, loopLength, baseStr, blanks, domEle, speed), (speed * loopLength) + 2000)
  }

  const bannerGimmick = (domEle, speed, dispTime, ...rest) => {
    const baseStr = domEle.innerText
    let timer = 0
    for(let i = 0; i < rest.length; i++){
      const endStr = rest[i]
      const loopLength = endStr.split(``).filter(char => char !== ensp).length
      setTimeout(() => generateStr(endStr, domEle, speed, loopLength, baseStr), timer)
      timer += (speed * loopLength * 2) + dispTime
    }
  }

  // bannerGimmick(banner, `'m Spencer Whitehead`, `'m a Full Stack Software Engineer`, ` love programming and learning new things`)
  bannerGimmick(banner, 100, 1500,
    `'m${ensp}Spencer${ensp}Whitehead`,
    `'m${ensp}a${ensp}Full${ensp}Stack${ensp}Software${ensp}Engineer`,
    `${ensp}love${ensp}programming${ensp}and${ensp}learning${ensp}new${ensp}things`)


  // GIMMICKY HEADEAR END
}
