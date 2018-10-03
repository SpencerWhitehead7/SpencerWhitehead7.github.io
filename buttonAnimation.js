{
  const projectButtons = document.getElementById(`project-buttons`)

  const projectsHeader = document.getElementById(`projects-header`)

  // touchstart is to handle mobile. It may cause two back to back events to be fired, which I'm testing
  projectButtons.addEventListener(`click touchstart`, evt => {
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

  document.getElementsByTagName(`body`)[0].addEventListener(`click touchstart`, () => {
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
}
