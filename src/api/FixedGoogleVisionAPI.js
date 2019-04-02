const analyzeImage = async (imageURL) => {
  // console.log(process.env.REACT_APP_GOOGLE_CLOUD_VISION_API_KEY)
  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "LABEL_DETECTION", maxResults: 10 },
            { type: "FACE_DETECTION", maxResults: 5 },
            { type: "IMAGE_PROPERTIES", maxResults: 5 },
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
    );
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  }
};

export default {
  analyzeImage : analyzeImage,
}