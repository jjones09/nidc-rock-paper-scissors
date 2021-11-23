import * as tmImage from '@teachablemachine/image';

let model;

export const init = async () => {
  model = await tmImage.load(
    `${process.env.PUBLIC_URL}/MODEL_DATA/model.json`,
    `${process.env.PUBLIC_URL}/MODEL_DATA/metadata.json`,
  );
  console.log('Model loaded');
};

export const getPrediction = async input => {
  const prediction = await model.predict(input);
  prediction.sort(
    (a, b) => b.probability - a.probability
  );
  console.log('Predictions');
  console.log(prediction);
  return prediction[0].className;
}

export const getClasses = () => model.getClassLabels();
