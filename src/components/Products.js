import React from 'react';
import Screen from './Screen';
import {Text, Linking, View} from 'react-native';
import {
  Button,
  Body,
  Container,
  Content,
  ListItem,
  Left,
  Right,
  Switch
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';
import { connect } from 'react-redux';
import {styles, dP} from 'app/utils/style/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Products extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Услуги' />,
  };

  renderContent() {
    const {products} = this.props;
    const productList = (products ? (
      products.map((item, index) => (
        <ListItem icon style={{height:56}} key={index}>
          <Left>
            <MaterialIcons active name="arrow-forward" style={{color:'#FED657', fontSize:24}} />
          </Left>
          <Body style={{height:56}}>
            <Text style={{fontFamily:'SFCT_Regular', color:'#FFFFFF', fontSize:16, lineHeight:56, height:56}}>
              {item.productName}
            </Text>
          </Body>
        </ListItem>
      ))
    ) : null);

    return (
      <Container style={styles.container}>
        <Content padder style={styles.content}>
          {productList}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state.user });

export default connect(mapStateToProps)(Products);
