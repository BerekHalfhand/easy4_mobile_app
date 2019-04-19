import React from 'react';
import { View, Text, Switch, FlatList } from 'react-native';
import { Container, Content, Icon, ListItem, Button, Body, Left, Right } from 'native-base';
import {styles} from 'app/utils/style/styles';
import StandardFooter from 'app/src/elements/Footer';
import LogoTitle from 'app/src/elements/LogoTitle';
import Screen from './Screen';
import Autolink from 'react-native-autolink';

/**
 * Описание действующего тарифа
 */
export default class Tariff extends Screen {
  constructor(props){
    super(props);
    let tariff = {};

    if (props.navigation.state && props.navigation.state.params) {
      tariff = props.navigation.state.params.tariff;
    }
    this.state = {
      tariff,
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

    const characteristicsRus = (this.state.tariff.characteristicsRus ? (
      <View>
        <View style={{marginTop: 16}}>
          <Text style={{color:'#FFFFFF', fontSize: 18}}>При нахождении на территории России:</Text>
        </View>
        <View style={{marginTop: 8}}>
          <FlatList
            data={this.state.tariff.characteristicsRus}
            renderItem={({item}) => <Text style={{color: '#FFFFFF'}}>{`\u2022 ${item.key}`}</Text>}
          />
        </View>
      </View>
    ) : null);

    const characteristicsNonRus = (this.state.tariff.characteristicsNonRus ? (
      <View>
        <View style={{marginTop: 16}}>
          <Text style={{color:'#FFFFFF', fontSize: 18}}>При нахождении за пределами России:</Text>
        </View>
        <View style={{marginTop: 8}}>
          <FlatList
            data={this.state.tariff.characteristicsNonRus}
            renderItem={({item}) => <Text style={{color: '#FFFFFF'}}>{`\u2022 ${item.key}`}</Text>}
          />
        </View>
      </View>
    ) : null);

    const devices = (this.state.tariff.devices ? (
      <View>
        <View style={{marginTop: 24}}>
          <Text style={{color:'#FFFFFF', fontSize: 20}}>Доступные устройства</Text>
        </View>
        <View style={{marginTop: 8}}>
          <Text style={{color:'#FFFFFF'}}>{this.state.tariff.devices}</Text>
        </View>
      </View>
    ) : null);

    return(
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View>
            <Text style={{color:'#FFFFFF', fontSize: 24}}>{ this.state.tariff.title }</Text>
          </View>
          <View style={{marginTop: 12}}>
            <Text style={{color:'#FFFFFF', fontSize: 14}}>{ this.state.tariff.text }</Text>
          </View>
          <View style={{marginTop: 8}}>
            <FlatList
              data={this.state.tariff.description}
              renderItem={({item}) => <Text style={{color: '#FFFFFF'}}>{`\u2022 ${item.key}`}</Text>}
            />
          </View>

          <View style={{marginTop: 24}}>
            <Text style={{color:'#FFFFFF', fontSize: 20}}>Характеристики</Text>
          </View>
          <View style={{marginTop: 8}}>
            <FlatList
              data={this.state.tariff.characteristics}
              renderItem={({item}) => <Text style={{color: '#FFFFFF'}}>{`\u2022 ${item.key}`}</Text>}
            />
          </View>

          {characteristicsRus}

          {characteristicsNonRus}

          <View style={{marginTop: 8}}>
            <Text style={{color:'#FFFFFF', fontSize: 10}}>Все цены указаны в рублях с учетом налогов</Text>
          </View>

          <View style={{marginTop: 24}}>
            <Text style={{color:'#FFFFFF', fontSize: 20}}>Особенности</Text>
          </View>
          <View style={{marginTop: 8}}>
            <FlatList
              data={this.state.tariff.quirks}
              renderItem={({item}) => <Text style={{color: '#FFFFFF'}}>{`\u2022 ${item.key}`}</Text>}
            />
          </View>

          {devices}

          <View style={{marginTop: 24}}>
            <Text style={{color:'#FFFFFF', fontSize: 20}}>Как подключить</Text>
          </View>
          <View style={{marginTop: 8}}>
            <Text style={{color:'#FFFFFF'}}>{`Оформить заявку на приобретение SIM-карт с тарифным планом ${this.state.tariff.title} можно на сайте easy4.pro`}</Text>
          </View>

          <View style={{marginTop: 24}}>
            <Text style={{color:'#FFFFFF', fontSize: 20}}>Территория оказания услуг</Text>
          </View>
          <View style={{marginTop: 8}}>
            <Text style={{color:'#FFFFFF'}}>{this.state.tariff.territoryText}</Text>
            <Text style={{color:'#FFFFFF', marginTop:8}}>{this.state.tariff.territoryList}</Text>
          </View>
          <View style={{marginTop: 16, marginBottom: 32}}>
            <Text style={{color:'#FFFFFF'}}>*Тариф указан без Ндс</Text>
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
