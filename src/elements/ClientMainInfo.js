import React from 'react';
import { View } from 'native-base';
import { Text } from 'react-native';
import { dP, styles } from 'app/utils/style/styles';


export default class ClientMainInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fake: {
        balance: '1020.03',
        date: '32 мая',
        minute: 2364,
        minutePack: 5000,
        gigabyte:'1.32',
        gigabytePack:'1.5',
        sms:1419,
        smsPack:1500
      }
    };
  }
  render(){

    return(
      <View style={styles.pane}>
        <View style={{flex: 1, flexDirection: 'row', alignContent:'space-between',
          shadowColor:'#000000',
          shadowRadius:5,
          shadowOffset:{width:10,height:16}
        }}>
          <View style={{width:'33%'}}>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.15, fontSize:14, textAlign:'center'}}>
                            Звонки
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-1.5, fontSize:34, textAlign:'center', color:dP.color.primary, paddingTop:8, paddingBottom:8}}>
              {this.state.fake.minute}
            </Text>
            { /* <Text style={{fontFamily:'SFCT_Regular', fontSize:13, textAlign:'center', color: 'rgba(0,0,0,0.4)'}}>
                            из {this.state.fake.minutePack} мин
            </Text>*/}
          </View>
          <View style={{width:'33%',borderLeftWidth:1, borderRightWidth:1, borderLeftColor:'#F2F2F2', borderRightColor:'#F2F2F2'}}>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.15, fontSize:14, textAlign:'center'}}>
                            Интернет
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-1.5, fontSize:34, textAlign:'center', color:dP.color.primary, paddingTop:8, paddingBottom:8}}>
              {this.state.fake.gigabyte}
            </Text>
            {/*<Text style={{fontFamily:'SFCT_Regular', fontSize:14, textAlign:'center', color: 'rgba(0,0,0,0.4)'}}>
                            из {this.state.fake.gigabytePack}  гб
            </Text>*/}
          </View>
          <View style={{width:'33%'}}>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.15, fontSize:14, textAlign:'center'}}>
                            СМС
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-1.5, fontSize:34, textAlign:'center', color:dP.color.primary, paddingTop:8, paddingBottom:8}}>
              {this.state.fake.sms}
            </Text>
            {/*<Text style={{fontFamily:'SFCT_Regular', fontSize:14, textAlign:'center', color: 'rgba(0,0,0,0.4)'}}>
                            из {this.state.fake.smsPack} СМС
            </Text>*/}
          </View>
        </View>
      </View>

    );
  }
}
