import React, {Component} from 'react';
import {View, SafeAreaView, Text, StatusBar, Dimensions} from 'react-native';
import {styles, dP} from 'app/utils/style/styles';
import NavBack from 'app/src/elements/NavBack';
import { Root, Content, Container } from 'native-base';

export default class Screen extends Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    headerBackImage: <NavBack />,
    headerBackTitle: null,
    headerTintColor: '#fff'
  };

  dimensions = { ...Dimensions.get('window') };

  showError = label => {
    if (this.props.errors && this.props.errors[label]) {
      console.log('showError', label);
      return (
        <Text style={{ color: dP.color.error, marginBottom: 10 }}>
          {this.props.errors[label]}
        </Text>
      );
    }
  }

  renderContent() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content} contentContainerStyle={styles.contentCentered}>
        </Content>
      </Container>
    );
  }

  render() {
    return(
      <Root>
        <SafeAreaView style={{flex: 0, backgroundColor: dP.color.primary}} />
        <SafeAreaView style={{flex: 1, backgroundColor: dP.color.accent}}>
          <View style={{flex: 1, backgroundColor: '#0f0'}}>
            <StatusBar barStyle='light-content' backgroundColor={dP.color.primary}/>
            {/*<StyleProvider style={getTheme(material)}>*/}
            {/*<DataContext.Provider value={data}>*/}
            {this.renderContent()}
            {/*</DataContext.Provider>*/}
            {/*</StyleProvider>*/}
          </View>
        </SafeAreaView>
      </Root>
    );
  }
}
