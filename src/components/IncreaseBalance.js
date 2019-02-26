import React from 'react';
import { View, Text } from 'react-native';
import { Container } from "native-base";


class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor:'#004d99' }}>
                <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:20}}>Управление расходами</Text>
            </View>
        );
    }
}

/**
 * Пополнение баланса
 */
export default class IncreaseBalance extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    static navigationOptions = {
        title: 'Расходы',
        headerTitle: <LogoTitle />,

        headerStyle: {
            backgroundColor:'#004d99',
        },
        headerTintColor: '#fff',

    };

    render() {
        return(
            <Container style={{backgroundColor:'#004d99'}}>

            </Container>
        )
    }
}
