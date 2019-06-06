import React from 'react';
import Screen from './Screen';
import {Text, View, ScrollView, TextInput} from 'react-native';
import {Button, Content, Container } from 'native-base';
import {styles, stylesExtra} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import {font, margin, padding} from 'app/utils/helpers';
import { fetchMessages, sendMessage, createChatroom } from 'app/src/actions';
import { connect } from 'react-redux';
import LogoTitle from 'app/src/elements/LogoTitle';
import { Constants } from 'expo';
import socketIO from 'socket.io-client';

class Chatroom extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      text: '',
      userId: ''
    };
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Чат' />,
  };

  async componentDidMount() {
    // const {chat} = this.props;
    this.socketConnect('ws://stage.mp.api.easy4.pro:3000/mobile-chat');

    await this.identifyUser();
    this.getChatroom(this.state.userId);
    // TODO: change this if userId and chatroom name diverge
    this.getMessages(this.state.userId);
  }

  socketConnect = server => {
    console.log('connecting to socket server', server);
    this.socket = socketIO(server, {
      transports: ['websocket'], jsonp: false
    });
    this.socket.connect();
    this.socket.on('connect', () => {
      console.warn('connected to socket server');
    });
  }

  identifyUser = () => {
    let userId = Constants.deviceId || Constants.installationId;
    if (this.props.user && this.props.user._id)
      userId = this.props.user._id;

    this.setState({userId});
  }

  getMessages = (userId) => {
    // console.log('userId', userId);
    this.props.dispatch(fetchMessages(userId));
  }

  getChatroom = (userId) => {
    // console.log('userId', userId);
    this.props.dispatch(createChatroom({
      name: userId,
      author: userId,
    }));
  }

  send() {
    console.log(this.state);
    if (!this.state.userId) return false;
    this.props.dispatch(sendMessage({
      author: this.state.userId,
      chatroom: this.state.userId,
      body: this.state.text
    }));
  }

  render() {
    const {chat} = this.props;
    if (!chat) return false;

    const messages = (chat.messages && chat.messages.length ? (
      chat.messages.map((item, index) => {
        if (!item.author) return null;
        return (
          <View key={index} style={{backgroundColor: '#FFF', borderRadius: 5, ...margin(10, 5), ...padding(5)}}>
            <Text style={font('Roboto_black', 16, '#000')}>
              {item.author}{"\n"}
            </Text>
            <Text style={font('Roboto_light', 13, '#000')}>
              {item.body}
            </Text>
          </View>
        );
      })
    ) : (
      <Text style={styles.textSimple}>
        Сообщений нет
      </Text>
    ));

    const inputBlock = (this.state.userId ? (
      <View style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: 40,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'green'
      }}>
        <TextInput style={{flex: 1}}
          onChangeText={(text) => this.setState({text})}
          multiline = {true}
          placeholder='Сообщение'
        />
        <Button rounded
          onPress={this.send}
        >
          <Text style={styles.textButtonPrimary}>
            Ok
          </Text>
        </Button>
      </View>
    ) : null);

    return (
      <Container style={styles.container}>
        <ScrollView>
          <Content style={{...styles.content, paddingBottom: 40}}>
            {messages}
          </Content>
        </ScrollView>

        {inputBlock}
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Chatroom);
