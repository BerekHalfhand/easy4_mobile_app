import React from 'react'
import { View, Footer, FooterTab, Button } from 'native-base';
import {TextInput, Image, StatusBar, Navigator, Text} from 'react-native';
import { dP } from '../../utils/style/styles'



export default class ClientMainBalance extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fake: {
                balance: '10200.03',
                date: '28 сентября'
            }
        }
    }
    render(){

        return(
            <View>
                <View style={{flex: 1, flexDirection: 'row', fontSize:16}}>
                    <View >
                        <Text style={{fontSize:16, color:'#FFFFFF'}}>
                            Баланс на
                        </Text>
                    </View>
                    <View>
                        <Text style={{marginLeft:5, fontSize:16, color:'#FFFFFF'}}>{ this.state.fake.date }</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: "flex-start", alignItems:'flex-end'}}>
                    <View style={{}}>
                        <Text style={{fontSize:46, marginRight:10, marginTop:10, color:'#FFFFFF', letterSpacing:-1.5}}>
                            {this.state.fake.balance}
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize:24, color:'#FFFFFF'}}>P</Text>
                    </View>
                </View>
            </View>

        )
    }
}