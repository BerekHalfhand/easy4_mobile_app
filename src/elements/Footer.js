import React from 'react';
import { Footer, FooterTab, Button } from 'native-base';
import { View, Keyboard } from 'react-native';
import {dP} from 'app/utils/style/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {readState} from 'app/src/actions';
import NavigationService from 'app/src/services/NavigationService';

class StandardFooter extends React.Component{
  toggleDrawer = () => {
    Keyboard.dismiss();
    this.props.dispatch(readState());
    this.props.navigation.openDrawer();
  }

  render(){
    const size = 24;
    const padding = 10;
    const { navigation } = this.props;

    const homeButton = (navigation &&
                        navigation.state &&
                        navigation.state.routeName != 'Home' ? (
        <Button
          onPress={() => NavigationService.navigate('Home')}
        >
          <View style={{padding: padding}}>
            <Icon
              name='home'
              size={size}
              color={dP.color.primary}
            />
          </View>
        </Button>
      ) : null );

    return(
      <View>
        <Footer>
          <FooterTab style={{backgroundColor: dP.color.accent}}>
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

            <Button
              onPress={() => NavigationService.navigate('Callback')}
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
              onPress={() => NavigationService.navigate('Feedback')}
            >
              <View style={{padding: padding}}>
                <Icon
                  name='comment'
                  size={size}
                  color={dP.color.primary}
                />
              </View>
            </Button>

            {homeButton}
          </FooterTab>
        </Footer>
      </View>

    );
  }
}

const mapStateToProps = state => state.auth;

export default withNavigation(connect(mapStateToProps)(StandardFooter));
