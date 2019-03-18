import React from 'react';
import {Text, View} from 'react-native';

export default class LogoTitle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      background: '#004d99',
      titleColor: '#FFFFFF',
      subTitleColor: '#FFFFFF',
      titleSize: 20,
      subTitleSize: 13,
      title: '',
      subTitle: '',
      borderBottomColor: '#B22222',
    };
  }

  renderSubtitle(subTitle, subTitleSize, subTitleColor) {
    return (
      <Text numberOfLines={1} style={{color: subTitleColor, textAlign:'center', fontSize: subTitleSize}}>{ subTitle }</Text>
    );
  }

  render() {
    const {
      background,
      titleColor,
      subTitleColor,
      titleSize,
      subTitleSize,
      title,
      subTitle,
      borderBottomColor
    } = Object.assign(this.state, this.props);

    return (
      <View style={{ backgroundColor:background, borderBottomColor: borderBottomColor }}>
        <Text numberOfLines={1} style={{color: titleColor, textAlign:'center', fontSize: titleSize}}>{ title }</Text>
        {subTitle ? this.renderSubtitle(subTitle, subTitleSize, subTitleColor) : null}
      </View>
    );
  }
}
