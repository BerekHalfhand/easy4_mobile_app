import React from 'react';
import { View, Text, Switch, FlatList } from 'react-native';
import { Container, Content, Icon, ListItem, Button, Body, Left, Right } from 'native-base';
import {styles} from 'app/utils/style/styles';
import StandardFooter from 'app/src/elements/Footer';
import LogoTitle from 'app/src/elements/LogoTitle';
import Screen from './Screen';

/**
 * Описание действующего тарифа
 */
export default class Tariff extends Screen {
  constructor(props){
    super(props);
    let title = 'Название тарифа',
      subTitle = 'Незаменимый продукт для туристов и бизнесменов, часто выезжающих за границу',
      text = '',
      description = [];

    if (props.navigation.state && props.navigation.state.params) {
      title = props.navigation.state.params.title;
      subTitle = props.navigation.state.params.subTitle;
      text = props.navigation.state.params.text;
      description = props.navigation.state.params.description;
    }
    this.state = {
      title,
      subTitle,
      text,
      description,
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
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Тариф' />,
  };

  handleSwitch(idx){
    let tariffServicesList = this.state.fake.tariffServicesList;
    tariffServicesList[idx].onOff = !tariffServicesList[idx].onOff;
    this.setState({
      tariffServicesList
    });
  }

  render(){
    // console.log('tariffServicesList:', this.state.fake.tariffServicesList);
    const listItem = this.state.fake.tariffServicesList;
    return(
      <Container style={{backgroundColor:'#004d99'}}>
        <Content padder style={{ width: '100%', padding:24}}>
          <View style={{marginTop:32}}>
            <Text style={{color:'#FFFFFF', fontSize: 24}}>{ this.state.title }</Text>
          </View>
          <View style={{marginTop:8}}>
            <Text style={{color:'#FFFFFF', fontSize: 16}}>{ this.state.subTitle }</Text>
          </View>
          <View style={{marginTop:12}}>
            <Text style={{color:'#FFFFFF', fontSize: 14}}>{ this.state.text }</Text>
          </View>
          <View style={{marginTop:8}}>
            <FlatList
              data={this.state.description}
              renderItem={({item}) => <Text style={{color: '#FFFFFF'}}>{`\u2022 ${item.key}`}</Text>}
            />
          </View>
          {/*<View>
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
          </View>*/}
        </Content>
        <StandardFooter />
      </Container>
    );
  }
}
