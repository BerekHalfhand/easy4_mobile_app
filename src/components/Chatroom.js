import React from 'react';
import Screen from './Screen';
import {Text, View, ScrollView, TextInput, FlatList} from 'react-native';
import {Button, Content, Container } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles, dP} from 'app/utils/style/styles';
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
    this.contentHeight = 0;
    this.scrollViewHeight = 0;
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
      setTimeout(() => this.scrollToBottom(80, true), 50);
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
    const {app} = this.props;
    if (!app.userId || !this.state.text) return false;

    // send message
    this.props.dispatch(sendMessage({
      author: app.userId,
      chatroom: app.userId,
      body: this.state.text
    }));

    // clear the input field
    this.textInput.clear();
    this.setState({text: ''});
  }

  scrollToBottom(offset, animated = true) {
    const scrollHeight = this.contentHeight - this.scrollViewHeight + offset;
    if (scrollHeight > 0) {
      const scrollResponder = this.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollTo({x: 0, y: scrollHeight, animated});
    }
  }

  render() {
    const {chat, app} = this.props;
    if (!chat) return false;

    const messages = (chat.messages && chat.messages.length ? (
      <FlatList
        keyExtractor={(item, index) => item.userId}
        style={{ flex:1}}
        data={chat.messages}

        renderItem={({ item }) => {
          let msgMargin = item._meta.ownMessage ? margin(10, 5, 10, 30) : margin(10, 30, 10, 5);
          return (
            <View style={{
              backgroundColor: '#FFF',
              borderRadius: 5,
              ...msgMargin,
              ...padding(5)
            }}>
              <Text style={font('Roboto_black', 16, '#000')}>
                {item._meta.author || item.author}{'\n'}
              </Text>
              <Text style={font('Roboto_light', 13, '#000')}>
                {item.body}
              </Text>
            </View>
          );
        }}
      />
    ) : (
      <Text style={styles.textSimple}>
        Сообщений нет
      </Text>
    ));

    const inputBlock = (app.userId ? (
      <View style={{
        flexDirection: 'row',
        flex: 0,
        flexShrink: 1,
        minHeight: 40,
        padding: 5,
        backgroundColor: dP.color.accent,
        borderTopWidth: 1,
        borderColor: 'grey'
      }}>
        <TextInput style={{flex: 1}}
          onChangeText={(text) => this.setState({text})}
          multiline = {true}
          placeholder='Сообщение'
          ref={input => { this.textInput = input; }}
        />
        <MaterialCommunityIcons
          name='send'
          onPress={this.send}
          size={30}
          style={{ alignSelf: 'center' }}
          color={dP.color.primary}
        />
      </View>
    ) : null);

    return (
      <Container style={{...styles.container, flex: 1}}>
        <ScrollView

          ref={scrollView => { this.scrollView = scrollView; }}
          onContentSizeChange={(w, h) => this.contentHeight = h}
          onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
        >
          <Content style={styles.content}>
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
