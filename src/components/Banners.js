import React from 'react';
import Screen from './Screen';
import {Animated, ImageBackground, StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native';
import {Container, Content, Button} from 'native-base';
import {styles, stylesExtra} from 'app/utils/style/styles';
import NavigationService from 'app/src/services/NavigationService';
import { connect } from 'react-redux';
import { markBannersSeen } from 'app/src/actions';

const deviceWidth = Dimensions.get('window').width;
const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

const captions = [
  'Создаём безроуминговое пространство по всему миру',
  'Одна SIM карта - несколько номеров (технология multi-IMSI)',
  'Построение уникальных корпоративных экосистем',
  'Международная мобильная платформа для интернета вещей',
];

class Banners extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

  onPressContinue = () => {
    this.props.dispatch(markBannersSeen());
    NavigationService.navigate('Home');
  }

  onPressTariffs = () => {
    NavigationService.navigate('TariffList');
  }

  requireImage = (index) => {
    let images = [
      require('app/assets/image/banners/1.jpg'),
      require('app/assets/image/banners/2.jpg'),
      require('app/assets/image/banners/3.jpg'),
      require('app/assets/image/banners/4.jpg'),
    ];
    return images[index];
  }

  numItems = captions.length;
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE);
  animVal = new Animated.Value(0);

  render() {
    let imageArray = [];
    let barArray = [];
    for (let i = 0; i < this.numItems; i++) {
      const thisImage = (
        <ImageBackground
          key={`image${i}`}
          source={this.requireImage(i)}
          style={{ width: deviceWidth }}
        >
          <View style={{padding: 24}}>
            <Text style={{...styles.textSimple, marginTop: 32, textAlign: 'center'}}>
              {captions[i]}
            </Text>
          </View>
        </ImageBackground>
      );
      imageArray.push(thisImage);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            stylesExtra.carousel.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              stylesExtra.carousel.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      );
      barArray.push(thisBar);
    }

    return (
      <Container style={{...styles.container, ...styles.contentCentered}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >

          {imageArray}

        </ScrollView>
        <View style={stylesExtra.carousel.barContainer} >
          {barArray}
        </View>
        <View style={stylesExtra.carousel.buttonsBlock} >

          <View style={{marginBottom: 8}}>
            <Button full large
              style={styles.buttonTariff}
              onPress={this.onPressTariffs}
            >
              <Text style={styles.textBlockH}>
                ТАРИФЫ
              </Text>
            </Button>
          </View>

          <View style={{marginBottom: 24}}>
            <Button full transparent rounded
              style={styles.buttonPrimaryInverse}
              onPress={this.onPressContinue}
            >
              <Text style={styles.textLargeBlock}>
                Я уже абонент Easy4
              </Text>

            </Button>
          </View>

        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => state.app;

export default connect(mapStateToProps)(Banners);
