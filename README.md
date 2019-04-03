# Who's the murderer?
### A guessing game using faces

Built with Python/Django, React and Google Vision. Google Vision analyzes faces and determines if a face falls into any of the following 7 categories: 
 - Joy
 - Sorrow
 - Anger
 - Surprise
 - Exposed
 - Blurred
 - Headwear/Hat

This app uses 5 of these classifcations to create a Guess Who style game.  Images are stored in an S3 Bucket and Google Vision is called each time a new game is started and a murderer is chosen.

Users can click to be shown clues about the murderer.

Users can upload their own images which are analyzed upon upload to ensure that they are usable for game play.

Users can choose the difficulty of a new game - varying how many images are displayed.
