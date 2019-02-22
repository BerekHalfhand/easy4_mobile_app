import React, {Component, cloneElement} from 'react';
// import { Font, AppLoading } from 'expo';
import {StyleSheet, StatusBar, View, ScrollView, AsyncStorage, Text, Image} from 'react-native';
import {styles, dP} from '../../utils/style/styles';
// import * as api from '../api';
import DataContext from './DataContext';

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            hasError: false,
            options: {
                data: {}
            },
            products: {
                data: {}
            }
        };
    }

    /**
     * Load options of Screen
     * @returns {Promise<any[]>}
     */
    loadData = async () => {

        const requests = ['fonts', 'options', 'data'];
        const fontLoading = Font.loadAsync({
            // 'SFCompact Text': require('../assets/fonts/Roboto-Medium.ttf'),
            'SFCompact Text': require('../../assets/fonts/SFCompactText-LightItalic.ttf'),
        });

        const dataLoading = api.productList().then(response => {
            this.setState({products: {...this.state.products, ...response}});
            return response;
        });

        const optionsLoading = api.options().then(response => {
            this.setState({options: {...this.state.options, ...response}});
            return response;
        });

        return Promise.all([fontLoading, optionsLoading, dataLoading]);
    }

    render() {
        if (this.state.loading) {
            // return (
            //     <AppLoading
            //         startAsync={this.loadData}
            //         onFinish={() => this.setState({loading: false})}
            //         onError={(e) => alert(e)}
            //     />
            // );
        }


        const data = {
            config: this.state.options.data,
            products: this.state.products.data
        };

        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" backgroundColor={dP.color.primary} borderBottomColor='#4064AD'/>
                {/*<StyleProvider style={getTheme(material)}>*/}
                <DataContext.Provider value={data}>
                    {this.props.children}
                </DataContext.Provider>
                {/*</StyleProvider>*/}
            </View>
        );
    }
}

export default Root;
