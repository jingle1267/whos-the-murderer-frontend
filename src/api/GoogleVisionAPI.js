const analyzeImage = (imageURL) => {
  return fetch(`https://vision.googleapis.com/v1/images:annotate`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer XX'
    },
    method: 'POST',
    body: JSON.stringify({
      "requests": [
          {
            "image": {
              "source": {
                "imageUri": imageURL
              }
            },
            "features": [
              {
                "type": "LABEL_DETECTION"
              },
              {
                "type": "FACE_DETECTION"
              },
              {
                "type": "IMAGE_PROPERTIES"
              }
            ]
          }
        ]
    })
  }).then((response) => response.json());
}

export default {
  analyzeImage: analyzeImage,
}
