import React from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Text, View } from 'react-native';
import {dP} from '../../utils/style/styles';
// import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class StandardFooter extends React.Component{

  render(){

    return(
      <View>
        <Footer>
          <FooterTab style={{backgroundColor: dP.color.accent}}>
            <Button>
              <View style={{padding: 10}}>
                <Text style={{color: dP.color.primary, fontSize: 16}}>
                  {/*<FontAwesome>{Icons.signInAlt}</FontAwesome>*/}
                  #
                </Text>
              </View>
            </Button>
            <Button>
              <View style={{padding: 10}}>
                <Text style={{color: dP.color.primary, fontSize: 16}}>
                  {/*<FontAwesome>{Icons.mapMarkerAlt}</FontAwesome>*/}
                  #
                </Text>
              </View>
            </Button>
            <Button>
              <View style={{padding: 10}}>
                <Text style={{color: dP.color.primary, fontSize: 16}}>
                  {/*<FontAwesome>{Icons.commentAlt}</FontAwesome>*/}
                  #
                </Text>
              </View>
            </Button>
            <Button>
              <View style={{padding: 10}}>
                <Text style={{color: dP.color.primary, fontSize: 16}}>
                  {/*<FontAwesome>{Icons.questionCircle}</FontAwesome>*/}
                  #
                </Text>
              </View>
            </Button>
          </FooterTab>
        </Footer>
      </View>

    );
  }
}
