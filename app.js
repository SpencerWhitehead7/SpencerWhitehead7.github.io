{
  const projectButtons = document.getElementById(`project-buttons`)

  const projectsHeader = document.getElementById(`projects-header`)

  projectButtons.addEventListener(`click`, evt => {
    evt.stopPropagation()
    projectsHeader.scrollIntoView(true)
    projectButtons.classList.add(`gone`)
    const ele = document.getElementById(evt.target.value)
    ele.classList.remove(`gone`)
    ele.classList.add(`visible`)
    setTimeout(() => ele.classList.remove(`hidden`), 1)
  })

  document.getElementsByTagName(`body`)[0].addEventListener(`click`, () => {
    const visibles = [...document.getElementsByClassName(`visible`)]
    if(visibles.length > 0){
      projectsHeader.scrollIntoView(true)
      visibles.forEach(ele => {
        ele.classList.remove(`visible`)
        ele.classList.add(`hidden`)
        setTimeout(() => ele.classList.add(`gone`), 300)
        setTimeout(() => projectButtons.classList.remove(`gone`), 300)
      })
    }
  })
}
