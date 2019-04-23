import React, {Component} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {Root} from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import NavBack from 'app/src/elements/NavBack';
import { Content, Container } from 'native-base';

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

  showError = label => {
    if (this.props.errors && this.props.errors[label])
      return (
        <Text style={{ color: dP.color.error, marginBottom: 10 }}>
          {this.props.errors[label]}
        </Text>
      );
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#f00'}}>
        <Root style={{flex: 1}}>
          {/*<StatusBar barStyle="light-content" backgroundColor={dP.color.primary} borderBottomColor='#4064AD'/>*/}
          {/*<StyleProvider style={getTheme(material)}>*/}
          {/*<DataContext.Provider value={data}>*/}
          {this.renderContent()}
          {/*</DataContext.Provider>*/}
          {/*</StyleProvider>*/}
        </Root>
      </SafeAreaView>
    );
  }
}
