import React from 'react';
import Screen from './Screen';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Content, Container} from 'native-base';
import NavigationService from 'app/src/services/NavigationService';
import autoBind from 'react-autobind';
import {styles} from 'app/utils/style/styles';

export default class Loader extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content} contentContainerStyle={styles.contentCentered}>
          <View style={{marginTop:32}}>
            <Text style={styles.textBlockH}>
              Загрузка
            </Text>
          </View>
          <View style={{marginTop:16, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => NavigationService.navigate('Home')}>
              <Image
                style={{width: 150, height: 200, resizeMode: 'contain'}}
                source={require('app/assets/image/logo3x.png')}
              />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
