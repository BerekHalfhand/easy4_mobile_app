import React, {Component} from 'react';
import {StyleSheet, Platform, View, StatusBar} from 'react-native';
import {Font} from 'expo';
import {Root, Text, Body, Container} from 'native-base';
// import AppFooter from "./Footer";
import DataContext from './DataContext';
import {styles, dP} from "../../utils/style/styles";

// const styles = StyleSheet.create({
//     logo: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     logoText: {
//         color: '#fff',
//         // fontFamily: 'Roboto medium',
//         fontSize: 16,
//         marginLeft: 10
//     },
//     baseHeader: {
//         backgroundColor: dP.color.primary,
//         // marginTop: Platform.OS === 'ios' ? 0 : -30
//         //height: Constants.statusBarHeight
//         //paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
//         //height: 24,
//     },
//     pageTitle: {
//         marginBottom: 10
//     }
// });

export default class Screen extends Component {
    constructor(props){
        super(props);
        this.state = {
            fontLoaded: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        const resultOptions = {
            headerStyle: styles.baseHeader,
            headerBackTitleStyle: {color: "#fff"},
            headerBackTitle: null,
            headerTintColor: "#fff"
        };

        return resultOptions;
    };

    componentDidMount(){
        Font.loadAsync({
            'SFCD_Black': require('../../assets/fonts/SFCompactDisplay-Black.ttf'),
            'SFCT_Semibold': require('../../assets/fonts/SFCompactText-Semibold.ttf'),
            'SFCT_Medium': require('../../assets/fonts/SFCompactText-Medium.ttf'),
            'SFCT_Regular': require('../../assets/fonts/SFCompactText-Regular.ttf'),
            'SFCT_Light': require('../../assets/fonts/SFCompactText-Light.ttf'),

            'Roboto': require("native-base/Fonts/Roboto.ttf"),
            'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
        })
            .then( () =>
                this.setState({ fontLoaded: true })
            )
    }

    renderBody() {

    }

    render() {
        // return <DataContext.Consumer>
        //     {data => <Container>
        //         {this.renderBody(data)}
        //     </Container>}
        // </DataContext.Consumer>;
        if (this.state.fontLoaded){
            return(

                <Root>
                    <View style={{flex: 1}}>
                        {/*<StatusBar barStyle="light-content" backgroundColor={dP.color.primary} borderBottomColor='#4064AD'/>*/}
                        {/*<StyleProvider style={getTheme(material)}>*/}
                        {/*<DataContext.Provider value={data}>*/}
                        {this.props.children}
                        {/*</DataContext.Provider>*/}
                        {/*</StyleProvider>*/}
                    </View>
                </Root>

            )
        }
        return(
            <Root></Root>
        )

    }
}
