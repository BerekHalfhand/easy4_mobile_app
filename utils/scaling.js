import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

const scaleTextToFit = (baseSize, containerWidthRatio, text, lengthOverride) => {
  // fontSize = Math.sqrt(textWidth*textHeight/text.length)
  // containerWidthRatio - float 0..1, where 1 = 100% screen width
  const textWidth = scale(baseSize);
  const textHeight = containerWidthRatio * width;
  const length = lengthOverride || text.toString().length;

  return Math.sqrt(textWidth*textHeight/length);
};

export {scale, verticalScale, moderateScale, scaleTextToFit};
