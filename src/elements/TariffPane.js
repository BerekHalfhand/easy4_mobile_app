import React from 'react';
import { View } from 'native-base';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { dP, styles } from 'app/utils/style/styles';
import PropTypes from 'prop-types';
import NavigationService from 'app/src/services/NavigationService';


export default class TariffPane extends React.Component{
  constructor(props){
    super(props);
  }

  onTouch() {
    NavigationService.navigate('Tariff');
  }

  render(){
    return(
      <View style={styles.pane}>
        <TouchableOpacity onPress={this.onTouch}>
          <Text style={{fontSize: 20, color: '#333'}}>{this.props.title}</Text>
          <Text style={{fontSize: 16, color: '#333'}}>{this.props.subTitle}</Text>

          <FlatList
            style={{marginTop: 10, color: '#333'}}
            data={this.props.description}
            renderItem={({item}) => <Text>{`\u2022 ${item.key}`}</Text>}
          />
        </TouchableOpacity>
      </View>

    );
  }
}

TariffPane.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string
  }))
};

TariffPane.defaultProps = {
  title: '',
  subTitle: '',
  description: [],
};
