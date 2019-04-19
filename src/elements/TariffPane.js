import React from 'react';
import { View, Button } from 'native-base';
import { Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import { styles } from 'app/utils/style/styles';
import PropTypes from 'prop-types';
import NavigationService from 'app/src/services/NavigationService';
import { travel, connect } from 'app/utils/tariffData.json';

export default class TariffPane extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeTariff: props.tariff,
      travel,
      connect,
    };
  }

  onTouch = () => {
    const tariff = this.state[this.props.tariff];
    NavigationService.navigate('Tariff', {tariff});
  }

  render(){
    const tariff = this.state[this.props.tariff];

    const button = (this.props.showButton ? (
      <Button bordered rounded info
        style={{alignSelf: 'center', marginTop: 10}}
        onPress={() => Linking.openURL(tariff.url)}
      >
        <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba', marginLeft: 10, marginRight: 10}}>
          Заказать SIM-карту
        </Text>
      </Button>
    ) : null);


    return(
      <View style={styles.pane}>
        <TouchableOpacity onPress={this.onTouch}>
          <Text style={{fontSize: 20, color: '#333'}}>{tariff.title}</Text>
          <Text style={{fontSize: 16, color: '#333'}}>{tariff.subTitle}</Text>

          <FlatList
            style={{marginTop: 10, color: '#333'}}
            data={tariff.description}
            renderItem={({item}) => <Text>{`\u2022 ${item.key}`}</Text>}
          />

          {button}
        </TouchableOpacity>
      </View>

    );
  }
}

TariffPane.propTypes = {
  tariff: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
};

TariffPane.defaultProps = {
  tariff: 'travel',
  showButton: false,
};
