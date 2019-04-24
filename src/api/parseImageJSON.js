const possibleAttributes = [
  "Facial hair", 
  "Glasses", 
  "Beard", 
  "Lipstick", 
  "Wrinkle",   
  "Shout", 
  "Moustache"
]

const possibleHeadwear = ["Hat", "Beanie", "Cap"]

let imageData = {
  mainEmotion : null,
  features: [],
  colors: [],
}

function grabMainEmotion(jsonObject) {
  const emotion = jsonObject.faceAnnotations[0]
  if (emotion.joyLikelihood === "VERY_LIKELY" || emotion.joyLikelihood === "LIKELY") {
    imageData.mainEmotion = "joy"
  } else if (emotion.sorrowLikelihood === "VERY_LIKELY" || emotion.sorrowLikelihood === "LIKELY") {
    imageData.mainEmotion = "sorrow"
  } else if (emotion.angerLikelihood === "VERY_LIKELY" ||emotion.angerLikelihood === "LIKELY") {
    imageData.mainEmotion = "anger"
  } else if (emotion.surpriseLikelihood === "VERY_LIKELY" || emotion.surpriseLikelihood === "LIKELY") {
    imageData.mainEmotion = "surprise"
  } else if (emotion.headwearLikelihood === "VERY_LIKELY" || emotion.headwearLikelihood === "LIKELY") {
    imageData.mainEmotion = "hat"
  }
}

function grabColors(jsonObject) {
  let color_array = []
  for (let element of jsonObject.imagePropertiesAnnotation.dominantColors.colors) {
    if (element.color.red + element.color.green + element.color.blue < 750) {
      color_array.push(element.color)
    }
    if (color_array.length === 3) {
      break;
    }    
    imageData.colors = color_array
  };
}


function getAdditionalAttributesAsArray(jsonObject) {
  let newAttributes = []
  for (let element of jsonObject.labelAnnotations) {
    if (possibleAttributes.includes(element.description)) {
      newAttributes.push(element.description)
      imageData.features.push(element.description)
    }
    if (imageData.mainEmotion !== "hat") {
      if (possibleHeadwear.includes(element.description)) {
        imageData.features.push("hat")
        break
      }
    }
  }
}

function hasHair(jsonObject) {
  for (let element of jsonObject.labelAnnotations) {
    if (/hair/i.test(element.description)) {
      if (!imageData.features.includes("Hair")) {
        imageData.features.push("Hair")
        break
      }
    }
  }
}

const parseData = (responseJson) => {
  let jsonObject = responseJson.responses[0]
  imageData.features = []
  grabMainEmotion(jsonObject)
  grabColors(jsonObject)
  hasHair(jsonObject)
  getAdditionalAttributesAsArray(jsonObject)
  // console.log(imageData)
  return imageData
} 

const isImageValid = (responseJson) => {
  let imageData = parseData(responseJson)
  // console.log(imageData)
  if (!imageData.mainEmotion) {
    return false
  } else if (imageData.features.length < 1) {
    return false
  } else {
    return true 
  }
}

const isImageValidwithJson = (responseJson) => {
  let imageData = parseData(responseJson)
  if (!imageData.mainEmotion) {
    return false
  } else if (imageData.features.length < 1) {
    return false
  } else {
    return imageData 
  }
}

export default {
  parseData: parseData,
  isImageValid: isImageValid,
  isImageValidwithJson: isImageValidwithJson

,}