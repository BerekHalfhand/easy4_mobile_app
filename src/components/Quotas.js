import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import Screen from './Screen';

class LogoTitle extends Screen {
  render() {
    return (
      <View style={{ backgroundColor:'#004d99' }}>
        <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:20}}>Квоты</Text>
      </View>
    );
  }
}

export default class Quotas extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Квоты' />,
  };

  renderContent(){

    return(
      <Container style={{backgroundColor:'#004d99'}}>
        <View>
          <Text>{ this.props.qoutas }</Text>
        </View>
        <View>
          <Text>{ this.props.quotas_list }</Text>
        </View>
      </Container>
    );
  }
}
