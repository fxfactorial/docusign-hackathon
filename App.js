/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

class Hack extends Component {
  state = {
    forests: false,
    climate_change: false,
    show_pdf: false,
  };

  render() {
    const { forests, climate_change, show_pdf } = this.state;
    let content = null;

    if (show_pdf) {
      //
    } else {
      content = (
        <View>
          <CheckBox title="Do you care about climate change" checked={climate_change} />

          <CheckBox center title="Click Here" checked={forests} />
        </View>
      );
    }
    return <View>{content}</View>;
  }
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
