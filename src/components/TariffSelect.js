import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Icon, ListItem, Button, Body, Left, Right } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import StandardFooter from 'app/src/elements/Footer';
import LogoTitle from 'app/src/elements/LogoTitle';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Screen from './Screen';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as tariffs from 'app/utils/tariffData.json';
import {font} from 'app/utils/helpers';
import {changeTariff} from 'app/src/actions';

/**
 * Описание действующего тарифа
 */

class TariffSelect extends Screen {
  constructor(props){
    super(props);
    autoBind(this);
    let tariff = {};
    let phone = null;

    if (props.navigation.state && props.navigation.state.params) {
      tariff = props.navigation.state.params.tariff;
      phone = props.navigation.state.params.phone;
    }

    this.state = {
      tariff,
      phone,
      availableTariffs: this.getAvailableTariffs(tariff),
      index: 0,
      routes: [
        { key: 'selected', title: 'Мой Тариф' },
        { key: 'change', title: 'Сменить Тариф' },
      ],
    };
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Тарифы' />,
  };

  selectTariff = (id) => {
    const { dispatch, auth } = this.props;
    if (!auth.accessToken) return false;

    dispatch(changeTariff(this.state.phone, id, auth.accessToken));
  };

  getAvailableTariffs(tariff) {
    let result = [];
    // console.log(Object.keys(tariffs));
    for (const key of Object.keys(tariffs)) {
      if (tariffs[key].id && tariffs[key].id != tariff.id)
        result.push({
          id: tariffs[key].id,
          title: tariffs[key].title
        });

    }
    // console.log(result);
    return result;
  }

  renderContent(){

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

    const selectedTariff = () => (
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
        <View style={{marginTop: 8, marginBottom: 32}}>
          <Text style={{color:'#FFFFFF'}}>{this.state.tariff.territoryText}</Text>
          <Text style={{color:'#FFFFFF', marginTop:8}}>{this.state.tariff.territoryList}</Text>
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
    );

    const changeTariff = () => (
      <Content style={styles.content}>
        {this.state.availableTariffs.map((item, key) => {
          return (
            <TouchableOpacity key={key}
              onPress={() => this.selectTariff(item.id)}
            >
              <Text style={font('Roboto', 16)}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Content>
    );


    return(
      <Container style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            selected: selectedTariff,
            change: changeTariff,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: this.dimensions.width }}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: dP.color.accent }}
              style={{ backgroundColor: dP.color.primary }}
            />
          }
        />
        <StandardFooter />
      </Container>
    );
  }
}


const mapStateToProps = state => state;

export default connect(mapStateToProps)(TariffSelect);
