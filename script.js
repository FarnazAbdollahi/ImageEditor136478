const preview = document.querySelector("#preview");
const previewScale = document.querySelector("#preview-scale");
const previewFlip = document.querySelector("#preview-flip");
const brightnessSlider = document.querySelector("#brightness");
const brightnessSliderValue = document.querySelector("#brightness-value");
const rotateSlider = document.querySelector("#rotate");
const rotateSliderValue = document.querySelector("#rotate-value");

var filterStyle = ""
var brightnessStyle = ""
var flipVerticalStyle = ""
var flipHorizontalStyle = ""
var rotateStyle = ""
var mouseStyle = ""
var pointerPosition = 0

const handleRotate = () => {
  const rotate = rotateSlider.value;
  rotateSliderValue.innerText = rotate;

  // TODO: write your code here
  let rad = (Math.PI * (rotate / 180)).toFixed(5);
  let radSin = (Math.abs(Math.sin(rad))).toFixed(5);
  let radCos = (Math.abs(Math.cos(rad))).toFixed(5);
  rotateStyle = `rotate(${rotate}deg) scale(${Number(radSin) + Number(radCos)})`;
  setTransformStyles()
};

const handleBrightness = () => {
  const brightness = brightnessSlider.value;
  brightnessSliderValue.innerText = brightness;

  // TODO: write your code here
  brightnessStyle = `brightness(${brightness}`
  setFilterStyles()

};

const handleFilter = (e) => {
  const { target } = e;
  const { id: filter } = target;
  // filter: "grayscale" | "sepia" | "invert" | "hue-rotate" | "contrast" | "saturate" | "blur"

  // TODO: write your code here

  switch (filter) {
    case "none":
      filterStyle = 'none'
      setFilterStyles()
      break;
    case "blur":
      filterStyle = `${filter}(2px)`
      setFilterStyles()
      break;
    case "contrast":
    case "saturate":
      filterStyle = `${filter}(2)`
      setFilterStyles()
      break;
    case "hue-rotate":
      filterStyle = `${filter}(90deg)`
      setFilterStyles()
      break;
    default:
      filterStyle = `${filter}(1)`
      setFilterStyles()
  }
  setFilterStyles()
};

const handleFlip = (flip) => {
  //  flip: "vertical:    transform: scaleX(-1);" | "horizontal:    /* transform: scaleY(-1); */"

  // TODO: write your code here
  if (flip == "vertical") {
    if (flipVerticalStyle == "scaleY(-1)") {
      flipVerticalStyle = 'scaleY(1)'
    } else {
      flipVerticalStyle = 'scaleY(-1)'
    }
  } else {
    if (flipHorizontalStyle == "scaleX(-1)") {
      flipHorizontalStyle = 'scaleX(1)'
    } else {
      flipHorizontalStyle = 'scaleX(-1)'
    }
  }
  setTransformStyles()

};

const handleMouseEnter = () => {
  // TODO: write your code here
  mouseStyle = "scale(2)"
  setTransformStylesOnPreview()
};

const handleMouseLeave = () => {
  // TODO: write your code here

  mouseStyle = "scale(1)"
  setTransformStylesOnPreview()

};

const handleMouseMove = (e) => {
  const imageWidth = previewScale.offsetWidth;
  const imageHeight = previewScale.offsetHeight;
  const imageOffsetTop = previewScale.offsetTop;
  const imageOffsetLeft = previewScale.offsetLeft;
  const pageX = e.pageX;
  const pageY = e.pageY;

  // TODO: write your code here
  let pointerPositionX = pageX - imageOffsetLeft
  let pointerPositionY = pageY - imageOffsetTop
  pointerPosition = `${pointerPositionX}px ${pointerPositionY}px`
  preview.style.transformOrigin = pointerPosition

};

const setFilterStyles = () => {
  if (filterStyle == "none") {
    preview.querySelector("img").style.filter = `${brightnessStyle}`
  } else {
    preview.querySelector("img").style.filter = ` ${filterStyle} ${brightnessStyle}`
  }

}
const setTransformStyles = () => {
  preview.querySelector("img").style.transform = `${mouseStyle} ${rotateStyle} ${flipVerticalStyle} ${flipHorizontalStyle}`
}
const setTransformStylesOnPreview = () => {
  preview.style.transform = `${mouseStyle}`
}