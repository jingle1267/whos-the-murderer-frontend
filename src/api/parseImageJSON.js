let imageData = {
  mainEmotion : "",
  headwear: false,
  colors: [],
  hair: false
}



function grabMainEmotion(jsonObject) {
  const emotion = jsonObject.faceAnnotations[0]
  if (emotion.joyLikelihood === "VERY_LIKELY" || emotion.joyLikelihood === "POSSIBLE" || emotion.joyLikelihood === "LIKELY") {
    imageData.mainEmotion = "joy"
  } else if (emotion.sorrowLikelihood === "VERY_LIKELY" || emotion.sorrowLikelihood === "POSSIBLE" || emotion.sorrowLikelihood === "LIKELY") {
    imageData.mainEmotion = "sorrow"
  } else if (emotion.angerLikelihood === "VERY_LIKELY" || emotion.angerLikelihood === "POSSIBLE" ||emotion.angerLikelihood === "LIKELY") {
    imageData.mainEmotion = "anger"
  } else if (emotion.surpriseLikelihood === "VERY_LIKELY" || emotion.surpriseLikelihood === "POSSIBLE" || emotion.surpriseLikelihood === "LIKELY") {
    imageData.mainEmotion = "surprise"
  } else if (emotion.headwearLikelihood === "VERY_LIKELY" || emotion.headwearLikelihood === "POSSIBLE" || emotion.headwearLikelihood === "LIKELY") {
    imageData.headwear = true
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

const possibleAttributes = ["Facial hair", "Glasses", "Beard", "Lipstick", "Wrinkle", "Shout", "Moustache"]
const possibleHeadwear = ["Hat", "Beanie", "Cap"]

// function getAdditionalAttributesAsKeys(jsonObject) {
//   for (let element of jsonObject.labelAnnotations) {
//     if (possibleAttributes.includes(element.description)) {
//       key = element.description.replace(/\s/g, '')
//       imageData[key.toLowerCase()] = true
//     }
//     if (element.description.includes("Hat")) {
//       imageData.headwear = true
//     }
//   }
// }

function getAdditionalAttributesAsArray(jsonObject) {
  let newAttributes = []
  for (let element of jsonObject.labelAnnotations) {
    if (possibleAttributes.includes(element.description)) {
      // key = element.description.replace(/\s/g, '')
      newAttributes.push(element.description)
    }
    if (possibleHeadwear.includes(element.description)) {
      imageData.headwear = true
    }
    imageData['otherAttributes'] = newAttributes
  }
}

function hasHair(jsonObject) {
  for (let element of jsonObject.labelAnnotations) {
      // let regex = /hair/i
    if (/hair/i.test(element.description)) {
      imageData.hair = true
    }
  }
}

const parseData = (jsonResponse) => {
  console.log("====================")
  console.log(jsonResponse.responses[0])  
  let jsonObject = jsonResponse.responses[0]
  getAdditionalAttributesAsArray(jsonObject)
  grabMainEmotion(jsonObject)
  grabColors(jsonObject)
  hasHair(jsonObject)
  return imageData
} 

export default {
  parseData: parseData
}