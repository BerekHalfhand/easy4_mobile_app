import React from 'react';
import Screen from './Screen';
import {Text, View, ScrollView, TextInput} from 'react-native';
import {Button, Content, Container } from 'native-base';
import {styles, stylesExtra} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import {font, margin, padding} from 'app/utils/helpers';
import { fetchMessages, sendMessage, createChatroom, receiveMessage } from 'app/src/actions';
import { connect } from 'react-redux';
import LogoTitle from 'app/src/elements/LogoTitle';
import { Constants } from 'expo';
import socketIO from 'socket.io-client';

class Chatroom extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      text: ''
    };
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Чат' />,
  };

  async componentDidMount() {
    const {app} = this.props;
    this.socketConnect('wss://stage.mp.api.easy4.pro');
    // this.socketConnect('ws://192.168.1.55:3000');

    this.getChatroom(app.userId);
    // TODO: change this if userId and chatroom name diverge
    this.getMessages(app.userId);
  }

  socketConnect = server => {
    console.log('connecting to socket server', server);
    this.socket = socketIO(server, {
      transports: ['websocket'],
      path: '/mobile-chat/ws'
    });

    this.socket.connect();

    this.socket.on('ready', () => {
      console.warn('connected to socket server', server);
    });

    this.socket.on('message', data => {
      console.warn('message received', data);
      this.props.dispatch(receiveMessage(data));
    });
  }

  getMessages = (userId) => {
    // console.log('userId', userId);
    this.props.dispatch(fetchMessages(userId));
  }

  getChatroom = (userId) => {
    console.log('getChatroom', userId);
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
    const {chat, app} = this.props;
    if (!chat) return false;

    const messages = (chat.messages && Object.keys(chat.messages).length ? (
      Object.keys(chat.messages).map(id => {
        if (!chat.messages[id].author) return null;
        chat.messages[id]._meta = {};

        chat.messages[id]._meta.ownMessage = false;
        if (chat.messages[id].author === app.userId) {
          chat.messages[id]._meta.ownMessage = true;
          chat.messages[id]._meta.author = 'Вы';
        }

        let msgMargin = chat.messages[id]._meta.ownMessage ? margin(10, 5, 10, 30) : margin(10, 30, 10, 5);
        return (
          <View key={id} style={{
            backgroundColor: '#FFF',
            borderRadius: 5,
            ...msgMargin,
            ...padding(5)
          }}>
            <Text style={font('Roboto_black', 16, '#000')}>
              {chat.messages[id]._meta.author || chat.messages[id].author}{'\n'}
            </Text>
            <Text style={font('Roboto_light', 13, '#000')}>
              {chat.messages[id].body}
            </Text>
          </View>
        );
      })
    ) : (
      <Text style={styles.textSimple}>
        Сообщений нет
      </Text>
    ));

    const inputBlock = (app.userId ? (
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
