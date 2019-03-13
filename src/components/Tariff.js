import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Container, Content, Icon, ListItem, Button, Body, Left, Right } from 'native-base';
import {styles} from '../../utils/style/styles';
import StandardFooter from '../elements/Footer';
import NavBack from '../elements/NavBack';

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor:'#004d99' }}>
        <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:20}}>Тариф</Text>
      </View>
    );
  }
}

/**
 * Описание действующего тарифа
 */
export default class Tariff extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fake: {
        tariffName:'Название тарифа',
        tariffDescription: 'Незаменимый продукт для туристов и бизнесменов, часто выезжающих за границу',
        tariffServicesTitle: 'Услуги',
        tariffServicesList: [
          {
            id: 1,
            name: 'Название услуги',
            description: 'Описание услуги',
            onOff: true
          },
          {
            id: 2,
            name: 'Название услуги 2',
            description: 'Описание услуги 2',
            onOff: true
          },
          {
            id: 3,
            name: 'Название услуги 3',
            description: 'Описание услуги 3',
            onOff: true
          },
          {
            id: 4,
            name: 'Название услуги 4',
            description: 'Описание услуги 4',
            onOff: true
          },
        ],
      }
    };
  }

  static navigationOptions = {
    headerBackImage: <NavBack />,
    headerBackTitle: null,
    headerTitle: navigation  =>  <LogoTitle title='Тариф' />,
    headerStyle: styles.baseHeader,
    headerTintColor: '#fff',
  };

  listItems(list){
    return(
      list.map(item => {
        `
          <ListItem >
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>{ item.name }</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
        `;
      })
    );
  }
  handleSwitch(idx){
    let tariffServicesList = this.state.fake.tariffServicesList;
    tariffServicesList[idx].onOff = !tariffServicesList[idx].onOff;
    this.setState({
      tariffServicesList
    });
  }

  render(){
    console.log('tariffServicesList:', this.state.fake.tariffServicesList);
    const listItem = this.state.fake.tariffServicesList;
    return(
      <Container style={{backgroundColor:'#004d99'}}>
        <Content padder>
          <View style={{marginTop:32}}>
            <Text style={{color:'#FFFFFF', fontSize: 24}}>{ this.state.fake.tariffName }</Text>
          </View>
          <View style={{marginTop:8}}>
            <Text style={{color:'#FFFFFF', fontSize: 14}}>{ this.state.fake.tariffDescription }</Text>
          </View>
          <View style={{marginTop:32}}>
            <Text style={{color:'#FFFFFF', fontSize: 20}}>{ this.state.fake.tariffServicesTitle }</Text>
          </View>
          <View>
            {
              listItem.map(
                (item, idx) => {
                  return (
                    <ListItem key={idx}>

                      <Body>
                        <Text style={{color:'#FFFFFF', fontSize: 16}}>{ item.name }</Text>
                        <Text style={{color:'#B8CDE2', fontSize: 13}}>{ item.description }</Text>
                      </Body>
                      <Right>
                        <Switch value={item.onOff}
                          onValueChange={()=> this.handleSwitch(idx)  }
                        />
                      </Right>
                    </ListItem>
                  );
                }
              )
            }
          </View>
        </Content>
        <StandardFooter />
      </Container>
    );
  }
}
