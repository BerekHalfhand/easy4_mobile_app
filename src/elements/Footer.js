import React from 'react';
import { View, Footer, FooterTab, Button, Icon } from 'native-base';
import {dP} from '../../utils/style/styles';


export default class StandardFooter extends React.Component{

  render(){

    return(
      <View>
        <Footer>
          <FooterTab style={{backgroundColor: dP.color.accent}}>
            <Button>
              {/*<FontAwesome>{Icons.chevronLeft}</FontAwesome>*/}
              <Icon name="ios-grid"/>
            </Button>
            <Button>
              <Icon name="ios-grid"/>
            </Button>
            <Button>
              <Icon name="ios-grid"/>
            </Button>
            <Button>
              <Icon name="ios-grid"/>
            </Button>
          </FooterTab>
        </Footer>
      </View>

    );
  }
}
