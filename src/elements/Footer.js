import React from 'react';
import { Footer, FooterTab, Button } from 'native-base';
import { View } from 'react-native';
import {dP} from '../../utils/style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class StandardFooter extends React.Component{

  render(){
    const size = 16;
    const padding = 10;

    return(
      <View>
        <Footer>
          <FooterTab style={{backgroundColor: dP.color.accent}}>
            <Button>
              <View style={{padding: padding}}>
                <Icon
                  name='sign-in'
                  size={size}
                  color={dP.color.primary}
                />
              </View>
            </Button>
            <Button>
              <View style={{padding: padding}}>
                <Icon
                  name='map-marker'
                  size={size}
                  color={dP.color.primary}
                />
              </View>
            </Button>
            <Button>
              <View style={{padding: padding}}>
                <Icon
                  name='comment'
                  size={size}
                  color={dP.color.primary}
                />
              </View>
            </Button>
            <Button>
              <View style={{padding: padding}}>
                <Icon
                  name='question-circle-o'
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
