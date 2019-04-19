import React from 'react';
import { View } from 'native-base';
import { Text } from 'react-native';
import { styles, dP } from 'app/utils/style/styles';
import PropTypes from 'prop-types';
import {font, margin} from 'app/utils/helpers';

export default class TariffConditions extends React.Component{
  constructor(props){
    super(props);
  }

  renderConditions() {
    const {tariff} = this.props;

    if (!tariff || !tariff.conditions) return false;

    const hr = (<View style={{...styles.horizontalLine, ...margin(8, 0, 6, 0)}} />);

    const conditions = tariff.conditions.map((item, index) => {
      return (
        <View key={index}>
          <Text style={{...font('Roboto_light', 16), marginTop: 2}}>
            {item.header}
          </Text>
          {
            item.highlight && (
              <Text style={{...font('Roboto_black', 16), marginTop: 2}}>
                {item.highlight}
              </Text>
            )
          }
          {
            item.lines && item.lines.map((item, index) => {
              return (
                <Text key={index} style={{...font('Roboto_light', 13), marginTop: 2}}>
                  {item}
                </Text>
              );
            })
          }
          {index < tariff.conditions.length - 1 ? hr : null}
        </View>
      );
    });

    return(
      <View>
        {conditions}
      </View>

    );
  }

  render(){
    return(
      <View style={{...styles.pane, padding: 16}}>
        <Text style={font('Roboto_bold', 16, dP.color.primary, null, {marginTop: -4, marginBottom: 10})}>
          Условия тарифа
        </Text>
        {this.renderConditions()}
      </View>

    );
  }
}

TariffConditions.propTypes = {
  tariff: PropTypes.shape({
    conditions: PropTypes.arrayOf(PropTypes.object),
  }),
};
