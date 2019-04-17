import React from 'react';
import { View, Button } from 'native-base';
import { Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import { styles } from 'app/utils/style/styles';
import PropTypes from 'prop-types';
import NavigationService from 'app/src/services/NavigationService';

export const travel = {
  title: 'Трэвел 2',
  subTitle: 'Easy4 Travel',
  url: 'https://easy4.pro/services/easy4-travel/',
  text: 'Тарифный план Трэвел 2 предназначен для туристов и деловых людей, часто совершающих международные поездки.',
  description: [
    { key: 'Тарифный план для звонков и мобильного интернета' },
    { key: 'Без абонентской платы' },
    { key: 'Единая цена на звонки и интернет в 29 странах, включая Россию' },
    { key: 'Бесплатные входящие на территории России, даже при нулевом балансе' },
    { key: 'Возможность объединения дополнительных номеров телефонов из разных стран на одной SIM-карте' },
  ],
  characteristics: [
    { key: 'Минимальный первоначальный авансовый платеж при подключении - 2590 ₽' },
    { key: 'Абонентская плата за месяц - 0 ₽' },
  ],
  characteristicsRus: [
    { key: 'Исходящие звонки на номера России и стран зоны покрытия тарифа Трэвел 2, мин. - 2.40 ₽' },
    { key: 'Исходящие звонки при нахождении на территории России и стран зоны покрытия Трэвел 2, мин.- 2.40 ₽' },
    { key: 'Входящие звонки, мин. - 0 ₽' },
    { key: 'Прием и передача данных, МБ - 1.20 ₽' },
    { key: 'Исходящие SMS, шт. - 18 ₽' },
  ],
  characteristicsNonRus: [
    { key: 'Исходящие звонки на номера России и стран зоны покрытия тарифа Трэвел 2, мин. - 2.40 ₽' },
    { key: 'Входящие звонки, мин.- 2.40 ₽' },
    { key: 'Прием и передача данных, МБ - 1.20 ₽' },
    { key: 'Исходящие SMS, шт. - 18 ₽' },
  ],
  quirks: [
    { key: 'Тарификация за голосовые услуги поминутная, за SMS - поштучная, за услуги передачи данных - помегабайтная. Голосовые вызовы округляются в большую сторону до минуты. Объем переданных/полученных данных в течение сессии округляется в большую сторону - с точностью до 100 КБ.' },
    { key: 'При нахождении в России соединения менее 3 (трех) секунд не тарифицируются.' },
    { key: 'При достижении баланса лицевого счета Абонента величины равной или ниже порога отключения доступ ко всем платным услугам Абонента блокируется, сохраняется доступность услуг входящих вызовов при нахождении на территории России, входящих SMS и услуг передачи данных по выделенным нетарифицируемым сервисам при нахождении в странах действия Трэвел 2. Порог отключения – 0 рублей.' },
    { key: 'К нетарифицируемым сервисам относятся сервисы Easy4: интернет сайт easy4.pro, личный кабинет, мобильное приложение, номер абонентской службы +7 958 798 1111.' },
    { key: 'Скорость приема и передачи данных без ограничений.' },
    { key: 'При подключении и переходе на тариф Трэвел 2 предусмотрен минимальный первоначальный авансовый платеж, который расходуется на услуги связи Easy4.' },
  ],
  number: '*100*1*1#',
  territoryText: 'Услуги предоставляются на территории России и стран зоны покрытия Трэвел 2, исходящие голосовые вызовы на номера территорий вне зоны покрытия Трэвел 2 не предоставляются.',
  territoryList: `Австрия • Бельгия • Великобритания • Венгрия • Германия • Греция • Дания • Израиль • Ирландия • Испания •
Кипр • Латвия • Литва • Мальта • Нидерланды • Норвегия • Польша • Португалия • Россия • Румыния • Словакия • США • Турция •
Финляндия • Франция • Хорватия • Чехия • Швеция • Эстония`,
};

export const connect = {
  title: 'Коннект 999',
  subTitle: 'Easy4 Connect',
  url: 'https://easy4.pro/services/easy4-connect/',
  text: 'Тарифный план Коннект 999 обеспечивает мобильный интернет для туристов и деловых людей, часто совершающих международные поездки.',
  description: [
    { key: 'Тарифный план для мобильного интернета' },
    { key: 'Стартовый пакет интернета 3 ГБ уже доступен при подключении к тарифу' },
    { key: 'Без ежемесячной платы' },
    { key: 'Тариф действует в 60 странах, включая Россию' },
  ],
  characteristics: [
    { key: 'Первоначальный авансовый платеж при подключении, включает пакет 3 ГБ - 1199 ₽' },
    { key: 'Стоимость подключения нового пакета 3 ГБ - 1199 ₽' },
    { key: 'Стоимость трафика вне пакета, за МБ – 1,2 ₽' },
    { key: 'Период действия пакета интернет трафика - 420 дней' },
    { key: 'Абонентская плата за месяц - 0 ₽' },
  ],
  devices: 'Мобильным интернетом по тарифу можно пользоваться в смартфоне, планшете, роутере и других «умных» устройствах.',
  quirks: [
    { key: 'При подключении и переходе на тарифный план происходит списание первоначального авансового платежа и предоставляется пакет интернет трафика объемом 3 ГБ. ' },
    { key: 'Период действия пакета интернет трафика 3 ГБ до 420 дней с момента подключения.' },
    { key: 'После исчерпания пакета трафика, при наличии на балансе достаточной суммы, происходит автоматическое подключение нового пакета 3 ГБ.' },
    { key: 'Если сумма на балансе недостаточна, можно продолжить пользоваться интернетом с тарификацией за 1 МБ.' },
    { key: 'Объем переданных/полученных данных в течение сессии округляется в большую сторону с точностью до 100 КБ.' },
    { key: 'Доступ в интернет к сервисам Easy4: сайта www.easy4.pro, личного кабинета, мобильного приложения не тарифицируется и возможен при балансе равном и ниже порога отключения.' },
    { key: 'Скорость приема и передачи данных без ограничений.' },
  ],
  number: '*100*1*2#',
  territoryText: 'Услуги предоставляются на территории России и стран зоны покрытия Коннект 999',
  territoryList: `Австралия • Австрия • Азербайджан • Андорра • Бельгия • Болгария • Босния и Герцеговина • Великобритания •
Венгрия • Вьетнам • Германия • Гонконг • Греция • Дания • Джерси • Египет • Израиль • Индия • Индонезия • Иран • Ирландия •
Исландия • Испания • Италия • Канада • Кипр • Китай • Латвия • Ливан • Литва • Лихтенштейн • Люксембург • Македония • Мальдивы •
Мальта • Монако • Нидерланды • Норвегия • ОАЭ • Панама • Польша • Португалия • Реюнион • Румыния • Сербия • Сингапур • Сирия •
Словакия • Словения • США • Таиланд • Турция • Финляндия • Франция • Хорватия • Черногория • Чехия • Швейцария • Швеция • Эстония`,
};

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

          <Text style={{fontSize: 14, color: '#333', marginTop: 10}}>* без НДС</Text>

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
