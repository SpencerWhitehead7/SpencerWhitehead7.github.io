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

  const typeWriterAdd  = () => {

  }

  const generateStr = (endStr, domEle, baseStr = ``) => {
    let newText = baseStr
    const blanks = new Array(endStr.length).fill(` `)
    const loopLength = endStr.split(``).filter(char => char !== ` `).length
    for(let i = 0; i < loopLength; i++){
      const oldBlanks = blanks.join(``)
      while(oldBlanks === blanks.join(``)){
        const index = Math.floor(Math.random() * endStr.length)
        blanks[index] = endStr[index]
      }
      newText = `${baseStr}${blanks.join(``).trimEnd()}`
      domEle.innerText = newText
      console.log(newText)
    }

    for(let i = 0; i < loopLength; i++){
      const oldBlanks = blanks.join(``)
      while(oldBlanks === blanks.join(``)){
        const index = Math.floor(Math.random() * blanks.length)
        blanks[index] = ` `
      }
      newText = `${baseStr}${blanks.join(``).trimEnd()}`
      domEle.innerText = newText
      console.log(newText)
    }
  }

  const bannerGimmick = (domEle, ...rest) => {
    const baseStr = domEle.innerText
    for(let i = 0; i < rest.length; i++){
      generateStr(rest[i], domEle, baseStr)
    }
  }

  bannerGimmick(banner, `'m Spencer Whitehead`, `'m a Full Stack Software Engineer`, ` love programming and learning new things`)

  // GIMMICKY HEADEAR END
}
