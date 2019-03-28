import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {Root} from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import NavBack from 'app/src/elements/NavBack';

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

  render() {
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
    );
  }
}
