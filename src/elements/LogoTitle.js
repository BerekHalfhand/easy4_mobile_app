import React from 'react';
import {Text, View} from "react-native";

export default class LogoTitle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            background: '#004d99',
            titleColor: '#FFFFFF',
            subTitleColor: '#FFFFFF',
            titleSize: 20,
            subTitleSize: 13,
            title: '',
            subTitle: ''
        };
    }

    render() {
        const {background, titleColor, subTitleColor, titleSize, subTitleSize, title, subTitle} = Object.assign(this.state, this.props);
        return (
            <View style={{ backgroundColor:background }}>
                <Text style={{color: titleColor, textAlign:'center', fontSize: titleSize}}>{ title }</Text>
                <Text style={{color: subTitleColor, textAlign:'center', fontSize: subTitleSize}}>{ subTitle }</Text>
            </View>
        );
    }
}
