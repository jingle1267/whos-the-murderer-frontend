const analyzeImage = async (imageURL) => {
  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "LABEL_DETECTION", maxResults: 15 },
            { type: "FACE_DETECTION" },
            { type: "IMAGE_PROPERTIES" },
          ],
          image: {
            source: {
              imageUri: imageURL
            }
          }
        }
      ]
    });
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        process.env.REACT_APP_GOOGLE_CLOUD_VISION_API_KEY,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: body
      }
    )
    let responseJson = await response.json();
    return responseJson
  } catch (error) {
    console.log(error);
  }
};

export default {
  analyzeImage : analyzeImage,
}