import React from 'react';
import {Font, AppLoading} from 'expo';

import {
  Content,
  CheckBox,
  Text,
  Body,
  Container,
  Button
} from 'native-base';
import {View, Image, Linking, Alert, AsyncStorage} from 'react-native';
import Screen from './Screen';
import {styles, dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import StandardFooter from 'app/src/elements/Footer';


export default class Home extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fontLoaded: false,
      offerAccepted: null,
    };
    this.getOfferState();
  }

    static navigationOptions = {
      headerStyle: styles.baseHeader,
      header: null,
      headerBackTitle: null,
    };

    onPressLogin() {
      if (this.state.offerAccepted === true)
        this.props.navigation.navigate('Login');
      else
        Alert.alert('Ошибка', 'Пожалуйста примите договор оферты');
    }

    onPressSignUp() {
      if (this.state.offerAccepted === true)
        this.props.navigation.navigate('SignUp');
      else
        Alert.alert('Ошибка', 'Пожалуйста примите договор оферты');
    }

    onPressOffer = async () => {
      let offerAccepted = !this.state.offerAccepted;

      this.setState({offerAccepted: offerAccepted});
      await AsyncStorage.setItem('offerAccepted', offerAccepted.toString());
    }

    getOfferState = async () => {
      const offerAccepted = await AsyncStorage.getItem('offerAccepted');

      if (offerAccepted == 'true')  this.setState({offerAccepted: true});
      else                          this.setState({offerAccepted: false});
    };

    renderOfferCheckbox() {
      if (this.state.offerAccepted !== null) {
        return (
          <Body style={{flexDirection: 'row', justifyContent: 'center', marginTop: 60}}>
            <CheckBox checked={this.state.offerAccepted}
              onPress={this.onPressOffer}
              style={styles.checkbox}
            />
            <View style={{marginLeft: 12}}>
              <Text style={{fontFamily:'SFCT_Regular',letterSpacing:-.025, color: '#ffffff'}}
                onPress={() => Linking.openURL('https://easy4.pro/upload/bf/usloviya2.pdf')}>Договор оферты</Text>
            </View>
          </Body>
        );
      }
    }

    render() {

      console.log('state:', this.state);
      if (this.state.fontLoaded){
        return (

          <Container>
            <Content padder style={{backgroundColor: dP.color.primary}}>
              <Body style={{ justifyContent: 'center', marginTop: 92}}>
                <Image source={require('../../assets/image/logo-w100.png')}/>
              </Body>
              <Body style={{marginTop: 24}}>
                <Text style={{fontFamily:'SFCT_Medium', letterSpacing:-0.5, fontSize:24, color:'#FFFFFF'}}>Добро пожаловать в Easy4</Text>
              </Body>
              <Body style={{marginTop: 24}}>
                <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, fontSize:16, color:'#FFFFFF'}}>Самое удобное приложение в мире</Text>
                <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, fontSize:16, color:'#FFFFFF'}}>среди приложений для приложений</Text>
              </Body>
              <Body style={{marginTop: 48}}>
                <Button full rounded
                  style={styles.buttonPrimary}
                  onPress={this.onPressLogin}
                >
                  <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba'}}>
                    Войти
                  </Text>
                </Button>
              </Body>

              <Body style={{marginTop: 12}}>
                <Button full transparent rounded
                  style={styles.buttonPrimaryInverse}
                  onPress={this.onPressSignUp}
                >
                  <Text style={{fontFamily:'SFCT_Semibold',letterSpacing:0.29, color:'#FED657', fontSize:13}} align='center'>
                    Создать аккаунт
                  </Text>

                </Button>
              </Body>

              {this.renderOfferCheckbox()}
            </Content>
            <StandardFooter />
          </Container>

        );
      }
      return(
        <Container>
          <Content padder style={{backgroundColor: dP.color.primary}}></Content>
        </Container>
      );


    }
}
