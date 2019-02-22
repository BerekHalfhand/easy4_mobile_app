import React, { Component } from 'react';
import {
    AlertIOS,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    NativeModules
} from 'react-native';

import TouchID from 'react-native-touch-id';

//config is optional to be passed in on Android
const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

export default class FingerPrint extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            biometryType: null
        }
    }
    componentDidMount() {
        // TouchID.isSupported()
        //     .then(biometryType => {
        //         this.setState({ biometryType });
        //     })
        //     .catch(error => {
        //         console.log('error:', error)
        //     })
        // TouchID.authenticate('Unlock with your fingerprint').then(success =>
        //     this.setState({ locked: false }),
        // );

    }

    pressHandler() {
        // TouchID.isSupported(optionalConfigObject)
        //     .then(biometryType => {
        //         // Success code
        //         if (biometryType === 'FaceID') {
        //             console.log('FaceID is supported.');
        //         } else if (biometryType === 'TouchID'){
        //             console.log('TouchID is supported.');
        //         } else if (biometryType === true) {
        //             // Touch ID is supported on Android
        //         }
        //     })
        //     .catch(error => {
        //         // Failure code
        //         console.log(error);
        //     });
        console.log('TouchId:', TouchID);
        TouchID.authenticate('to demo this react-native component', optionalConfigObject)
            .then(success => {
                AlertIOS.alert('Authenticated Successfully');
            })
            .catch(error => {
                AlertIOS.alert('Authentication Failed');
            });
    }

    render() {
        console.log('state:', this.state);
        return (
            <View>
                <TouchableHighlight onPress={this.pressHandler}>
                    <Text>
                        Authenticate with Touch ID
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
};
