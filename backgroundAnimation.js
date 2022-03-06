const cachingImage = new Image()
const BACKGROUND_SRC = `images/bg.webp`

cachingImage.onload = () => {
  document.getElementsByTagName(`body`)[0].style.background = `url(${BACKGROUND_SRC}) fixed center center / cover no-repeat`
}

cachingImage.src = BACKGROUND_SRC
