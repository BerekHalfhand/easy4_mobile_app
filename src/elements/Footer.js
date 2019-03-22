import React from 'react';
import { Footer, FooterTab, Button } from 'native-base';
import { View } from 'react-native';
import {dP} from 'app/utils/style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class StandardFooter extends React.Component{

  render(){
    const size = 16;
    const padding = 10;

    return(
      <View>
        <Footer>
          <FooterTab style={{backgroundColor: dP.color.accent}}>
            <Button
              onPress={() => this.props.navigation.navigate('Callback')}
            >
              <View style={{padding: padding}}>
                <Icon
                  name='question-circle-o'
                  size={size}
                  color={dP.color.primary}
                />
              </View>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate('Chatroom')}
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

export default withNavigation(StandardFooter);
