const cachingImage = new Image()
const fullBackgroundSrc = `images/bg.png`
const HTMLBodyStyle = document.getElementsByTagName(`body`)[0].style

cachingImage.onload = () => {
  HTMLBodyStyle.background = `url(${fullBackgroundSrc}) no-repeat center center fixed`
  HTMLBodyStyle[`background-size`] = `cover` // necessary even though it's already set in stylesheet
}

cachingImage.src = fullBackgroundSrc
