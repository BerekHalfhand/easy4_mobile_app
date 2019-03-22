import React from 'react';
import {Text, View, Keyboard} from 'react-native';
import {withNavigation} from 'react-navigation';
import { connect } from 'react-redux';

class LogoTitle extends React.Component {
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

  toggleDrawer = () => {
    Keyboard.dismiss();
    
    if (this.props.authorized)
      this.props.navigation.openDrawer();
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
      borderBottomColor,
      navigation
    } = Object.assign(this.state, this.props);

    return (
      <View style={{ backgroundColor:background, borderBottomColor: borderBottomColor }}>
        <Text onPress={this.toggleDrawer} numberOfLines={1} style={{color: titleColor, textAlign:'center', fontSize: titleSize}}>{ title }</Text>
        {subTitle ? this.renderSubtitle(subTitle, subTitleSize, subTitleColor) : null}
      </View>
    );
  }
}


const mapStateToProps = state => ({ ...state });

export default withNavigation(connect(mapStateToProps)(LogoTitle));
