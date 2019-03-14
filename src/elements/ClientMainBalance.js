import React from 'react';
import { View, Footer, FooterTab, Button } from 'native-base';
import {TextInput, Image, StatusBar, Navigator, Text, Dimensions} from 'react-native';
import { dP } from '../../utils/style/styles';
import PropTypes from 'prop-types';



export default class ClientMainBalance extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fake: {
        balance: '10200.03',
        date: '28 сентября'
      }
    };
  }
  render(){
    const { width, height } = Dimensions.get('window');
    const guidelineBaseWidth = 420;
    const scale =  width / guidelineBaseWidth;
    // console.log('white:', width);

    return(
      <View>
        <View style={{flex: 1, flexDirection: 'row', fontSize:16}}>
          <View >
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, fontSize:16, color:'#FFFFFF'}}>
                            Баланс на
            </Text>
          </View>
          <View>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, marginLeft:5, fontSize:16, color:'#FFFFFF'}}>{ this.state.fake.date }</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems:'flex-end'}}>
          <View style={{}}>
            <Text style={{fontFamily:'SFCT_Light', fontSize:(46*scale), marginRight:10, marginTop:10, color:'#FFFFFF', letterSpacing:-2.5}}>
              {this.props.balance || this.state.fake.balance}
            </Text>
          </View>
          <View>
            <Text style={{fontSize:24, color:'#FFFFFF'}}>P</Text>
          </View>
        </View>
      </View>

    );
  }
}

ClientMainBalance.propTypes = {
  balance: PropTypes.number,
};
