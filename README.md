# Rock Paper Scissors

A basic React app for playing Rock Paper Scissors against a 'bot' (AKA a random number between 0 and 2)

Powered by models generated from Google's Teachable Machine tool.

## Built using
* [React](https://github.com/facebook/react)
* [react-webcam](https://github.com/mozmorris/react-webcam)
* [Google's Teachable Machine](https://teachablemachine.withgoogle.com/)
* ['Roshambo' icon set by Studio Fibonacci from the Noun Project](https://thenounproject.com/StudioFibonacci/collection/roshambo/)

## How to run
(Requires `nodejs` and `npm`/`yarn`)
1. Clone this repo
2. Run `npm install`/`yarn` in root directory
3. Create and download model from Teachable Machine (see below)
4. Unzip the download file and place the contents in the `public/MODEL_DATA` directory
5. Run `npm run start`/`yarn start` in the root directory and open a browser window at `localhost:3000`
6. Have fun!

## Creating a Model
1. Go to `https://teachablemachine.withgoogle.com/`
2. Select `Get Started` and then `Image Project > Standard Image Model`
3. Create three classes, named `rock`, `paper`, and `scissors`
4. For each class, do the following steps:
    1. Select `webcam` to enable your cam feed
    2. While doing the correct hand gesture for the class, hold the `Hold to Record` button down
    3. Try moving your hand around a little while doing this to add some variance to the samples
    4. Stop when you have enough samples (usually around 100 will work) and make sure that each class gets a roughly equal amount of sample images
5. You're now ready to train, but feel free to expand the `Advanced` section and play around with some of the parameters
6. Keep this tab open and focused until the model finishes training - with the standard params it will only take like 30 seconds (depending on the amount of pictures in each class)
7. Once it's done training you can try your shiny new model out in the live preview and, when you're ready, click `Export Model`
8. Stay on the `Tensorflow.js` tab, and pick the `Download` radio button and hit `Download my model`

## Rules of 'Rock Paper Scissors'
Well, when a rock really hates a pair of scissors...
Nah, you know the rules.
