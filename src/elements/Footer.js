import React from 'react';
import { Footer, FooterTab, Button } from 'native-base';
import { View, Keyboard } from 'react-native';
import {dP} from 'app/utils/style/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {readState} from 'app/src/actions';

class StandardFooter extends React.Component{
  toggleDrawer = () => {
    Keyboard.dismiss();
    this.props.dispatch(readState());

    if (this.props.authorized)
      this.props.navigation.openDrawer();
  }

  render(){
    const size = 24;
    const padding = 10;

    const menuButton = (this.props.authorized ? (
      <Button
        onPress={this.toggleDrawer}
      >
        <View style={{padding: padding}}>
          <Icon
            name='menu'
            size={size}
            color={dP.color.primary}
          />
        </View>
      </Button>
    ) : null);

    return(
      <View>
        <Footer>
          <FooterTab style={{backgroundColor: dP.color.accent}}>
            {menuButton}
            <Button
              onPress={() => this.props.navigation.navigate('Callback')}
            >
              <View style={{padding: padding}}>
                <Icon
                  name='phone-forwarded'
                  size={size}
                  color={dP.color.primary}
                />
              </View>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate('Feedback')}
            >
              <View style={{padding: padding}}>
                <Icon
                  name='comment'
                  size={size}
                  color={dP.color.primary}
                />
              </View>
            </Button>
          </FooterTab>
        </Footer>
      </View>

    );
  }
}

const mapStateToProps = state => state.auth;

export default withNavigation(connect(mapStateToProps)(StandardFooter));
