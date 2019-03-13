import React from 'react';
import { StyleSheet } from 'react-native';

export const dP ={
  color: {
    primary: '#004d99',
    accent: '#FED657',
    white: '#FFFFFF',
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    width: dP.size.buttonWidth,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: dP.color.accent,
    // borderRadius: 24
  },
  buttonPrimaryCash: {
    // width: dP.size.buttonWidth,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: dP.color.accent,
    // borderRadius: 24
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
    backgroundColor: dP.color.primary,
    // borderRadius: 24
  },
  buttonPrimaryInverseText: {
    color: dP.color.accent,
    fontSize: dP.size.text
  },
  checkbox: {
    backgroundColor: dP.color.accent,
    borderColor: dP.color.accent,
    borderRadius: 4,
    marginRight: 12
    // color: '#005EBA'
  },
  whiteTextColor: {
    color: dP.color.white,
    fontSize: dP.size.text,
    // fontFamily: 'SFCompact Text'
  },
  whiteTextColorH: {
    color: dP.color.white,
    fontSize: dP.size.h,
    // fontFamily: 'SFCompact Text'
  }
});
