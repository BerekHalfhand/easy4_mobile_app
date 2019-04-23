import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const dP ={
  color: {
    primary: '#004d99',
    accent: '#FED657',
    white: '#FFFFFF',
    error: 'red',
  },
  size: {
    h: 24,
    text: 16,
    logo: 100,
    margin: 24,
    buttonWidth: 200,
  }
};
export const styles = StyleSheet.create({
  // HEADER
  logo: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    color: '#fff',
    // fontFamily: 'Roboto medium',
    fontSize: 16,
    // marginLeft: 10
  },
  baseHeader:{
    backgroundColor: dP.color.primary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  pageTitle: {
    // marginBottom: 10,
    textAlign: 'center'
  },
  // COMMON
  container: {
    backgroundColor: dP.color.primary,
  },
  content: {
    padding: 16,
    width,
    minHeight: height,
    // borderColor: 'red', borderWidth: 1,
  },
  contentCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // FONTS
  whiteTextColor: {
    color: dP.color.white,
    fontSize: dP.size.text,
    // fontFamily: 'SFCompact Text'
  },
  whiteTextColorH: {
    color: dP.color.white,
    fontSize: dP.size.h,
    // fontFamily: 'SFCompact Text'
  },
  textPrimaryH: {
    color: dP.color.white,
    fontFamily: 'SFCT_Light',
    letterSpacing: -2.5,
    fontSize: 48,
  },
  textSecondaryH: {
    color: dP.color.white,
    fontFamily: 'SFCT_Regular',
    letterSpacing: -1.5,
    fontSize: 34,
  },
  textBlockH: {
    color: dP.color.white,
    fontFamily: 'SFCT_Medium',
    letterSpacing: -0.5,
    fontSize: 24,
  },
  textSmallBlockH: {
    color: dP.color.white,
    fontFamily: 'SFCT_Medium',
    letterSpacing: -0.25,
    fontSize: 20,
  },
  textSimple: {
    color: dP.color.white,
    fontFamily: 'SFCT_Regular',
    letterSpacing: -0.25,
    fontSize: 16,
  },
  textLargeBlock: {
    color: dP.color.white,
    fontFamily: 'SFCT_Regular',
    letterSpacing: -0.15,
    fontSize: 14,
  },
  textButtonPrimary: {
    color: dP.color.primary,
    fontFamily: 'SFCT_Semibold',
    letterSpacing: 0.25,
    fontSize: 16,
  },
  textButtonSecondary: {
    color: dP.color.accent,
    fontFamily: 'SFCT_Semibold',
    letterSpacing: 0.25,
    fontSize: 13,
  },
  textLabel: {
    color: dP.color.white,
    fontFamily: 'SFCT_Regular',
    letterSpacing: 0,
    fontSize: 13,
  },
  textDate: {
    color: dP.color.white,
    fontFamily: 'SFCT_Medium',
    letterSpacing: 2,
    fontSize: 13,
  },
  // CARD
  cardItem: {
    backgroundColor: '#4064AD'
  },
  cardItemName: {
    fontFamily: 'Roboto medium',
    marginBottom: 6
  },
  cardItemBody:{
    flex: 1,
    //alignItems: 'left',
    justifyContent: 'center'
  },
  cardItemLeft:{
    flex: 0,
    paddingRight: 16
  },
  cardItemRight:{
    flex: 0
  },
  cardItemDescription: {
    marginBottom: 6,
    color: '#fff',
    fontSize: 18
  },
  // Старт
  statusBar: {
    backgroundColor: '#ffffff',
  },
  buttonPrimary: {
    width: dP.size.buttonWidth,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: dP.color.accent,
    alignSelf: 'center',
  },
  buttonPrimaryCash: {
    // width: dP.size.buttonWidth,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: dP.color.accent,
  },
  buttonPrimaryText: {
    color: dP.color.primary,
    fontSize: dP.size.text
  },
  buttonPrimaryInverse: {
    width: dP.size.buttonWidth,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    alignSelf: 'center',
  },
  buttonPrimaryInverseText: {
    color: dP.color.accent,
    fontSize: dP.size.text
  },
  buttonTariff: {
    width: 150,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    backgroundColor: dP.color.accent,
    alignSelf: 'center',
    borderRadius: 10,
    // borderRadius: 24
  },
  checkbox: {
    backgroundColor: dP.color.accent,
    borderColor: dP.color.accent,
    borderRadius: 4,
    marginRight: 12
  },
  inputIcon: {
    position: 'absolute',
    top: 33,
    right: 0
  },
  pane: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:dP.color.white,
    borderRadius:8,
    padding:16,
    shadowColor:'#002B55',
    shadowRadius:8,
    shadowOffset:{width:0,height:8},
    shadowOpacity:.5
  },
  horizontalLine: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    width: '100%',
  }
});
export const stylesExtra = {
  input: {
    textColor: dP.color.white,
    baseColor: '#ABABAB',
    tintColor: dP.color.accent,
    errorColor: dP.color.error,
  },
  carousel: {
    barContainer: {
      position: 'absolute',
      zIndex: 2,
      bottom: 10,
      flexDirection: 'row',
    },
    track: {
      backgroundColor: '#ccc',
      overflow: 'hidden',
      height: 2,
    },
    bar: {
      backgroundColor: '#5294d6',
      height: 2,
      position: 'absolute',
      left: 0,
      top: 0,
    },
    buttonsBlock: {
      height: '100%',
      padding: 24,
      position: 'absolute',
      justifyContent: 'flex-end',
    }
  }
};
