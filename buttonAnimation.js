{
  const body = document.getElementsByTagName(`body`)[0]
  const projectButtons = document.getElementById(`project-buttons`)
  const projectsHeader = document.getElementById(`projects-header`)

  const eventType = document.documentElement.ontouchstart ? `touchstart` : `click`

  projectButtons.addEventListener(eventType, evt => {
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

  body.addEventListener(eventType, evt => {
    evt.stopPropagation()
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
