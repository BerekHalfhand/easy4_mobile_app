import React, {Component} from 'react';
import {StyleSheet, Platform, View, StatusBar} from 'react-native';
// import {Svg, Constants} from 'expo';
import {Text, Body, Container} from 'native-base';
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
    static navigationOptions = ({ navigation }) => {
        const resultOptions = {
            headerStyle: styles.baseHeader,
            headerBackTitleStyle: {color: "#fff"},
            headerBackTitle: null,
            headerTintColor: "#fff"
        };

        // if(navigation.state && navigation.state.params && navigation.state.params.title){
        //     resultOptions.headerTitle = <Text style={styles.logoText}>{navigation.state.params.title}</Text>;
        // } else {
        //     resultOptions.headerTitle = <Body style={styles.logo}>
        //     {/*<Svg height={30} width={30}>*/}
        //         {/*<Svg.Path*/}
        //             {/*fill="#E95074"*/}
        //             {/*d="M29.8,12.5c0.1,0.8,0.2,1.7,0.2,2.5c0,1.5-0.2,2.9-0.6,4.3l0,0C22,17.9,10,14.7,3.6,24.7 c-1.5-1.7-2.5-3.8-3.1-6l0-0.2l0-0.1l-0.1-0.3l0-0.1c0-0.1,0-0.2-0.1-0.3v0c-0.1-0.4-0.1-0.8-0.2-1.1c1.7-1.1,3.6-1.6,5.8-1.9 c5.8-0.8,12.6-0.3,18.4-0.9C26.2,13.5,28.2,13,29.8,12.5L29.8,12.5z"*/}
        //         {/*/>*/}
        //         {/*<Svg.Path*/}
        //             {/*fill="#66B44A"*/}
        //             {/*d="M29.2,20c-1.7,5-6.1,8.8-11.4,9.8C16.9,29.9,16,30,15,30c-1.2,0-2.3-0.1-3.5-0.4c-1.8-0.4-3.4-1.1-4.9-2.1 C8.3,16.4,25,20.8,29.2,20L29.2,20z"*/}
        //         {/*/>*/}
        //         {/*<Svg.Path*/}
        //             {/*fill="#24BCEE"*/}
        //             {/*d="M25.4,4.2c1.1,1.1,2.1,2.4,2.8,3.8c-1,4.2-8.4,3.6-16.3,4.3C6.1,12.8,2.4,13.6,0,14.8c0-0.7,0.1-1.5,0.2-2.2 C9.9,12.5,19.3,1.7,25.4,4.2z"*/}
        //         {/*/>*/}
        //         {/*<Svg.Path*/}
        //             {/*fill="#F8AF00"*/}
        //             {/*d="M15,0c3.4,0,6.6,1.2,9.1,3.1c-0.6-0.2-1.3-0.4-2-0.5c-8.9-1.2-16.9,8.1-21,6.8C3.3,3.9,8.7,0,15,0z"*/}
        //         {/*/>*/}
        //     {/*</Svg>*/}
        //     {/*<Text style={styles.logoText}>Easy4</Text>*/}
        //     </Body>
        // }

        return resultOptions;
    };

    renderBody() {

    }

    render() {
        // return <DataContext.Consumer>
        //     {data => <Container>
        //         {this.renderBody(data)}
        //     </Container>}
        // </DataContext.Consumer>;

        return(
            <View style={{flex: 1}}>
                {/*<StatusBar barStyle="light-content" backgroundColor={dP.color.primary} borderBottomColor='#4064AD'/>*/}
                {/*<StyleProvider style={getTheme(material)}>*/}
                {/*<DataContext.Provider value={data}>*/}
                    {this.props.children}
                {/*</DataContext.Provider>*/}
                {/*</StyleProvider>*/}
            </View>
        )
    }
}
