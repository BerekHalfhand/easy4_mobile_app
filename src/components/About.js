import React from 'react';
import Screen from './Screen';
import {Text, View, WebView} from 'react-native';
import {
  Container,
  Content,
  Body
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';
import {styles, dP} from 'app/utils/style/styles';

export default class About extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='О приложении' />,
  };

  render() {
    return (
      <Container style={{backgroundColor: dP.color.primary}}>
        <Content padder style={{ width: '100%', padding:24}}>
          <Body>
            <Text style={{...styles.whiteTextColor, marginBottom: 8, textAlign: 'justify'}}>
              В июне 2018 года под брендом Easy4 начал работать новый виртуальный оператор связи. Easy4 использует интеллектуальную платформу Multi IMSI* от резидента фонда «Сколково». Это позволяет создавать уникальные продукты как в сфере туризма для путешественников, так и сложные технические решения для корпоративных клиентов в различных секторах экономики. Easy4 может эффективно использовать сети других операторов связи, подключаться к российским и международным сетям по принципу лучшего качества сигнала и, таким образом, обеспечивать надежное качество связи.
            </Text>
            <Text style={{...styles.whiteTextColor, marginBottom: 8, textAlign: 'justify'}}>
              Скачайте мобильное приложение Easy4 для ознакомления с тарифами оператора, контроля баланса и оперативного пополнения лицевого счета.
            </Text>
          </Body>
        </Content>
      </Container>
    );
  }
}
