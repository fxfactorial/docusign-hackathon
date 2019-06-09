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

const APP_ROUTE = 'http://34.94.236.97:80/letter.pdf';

class Hack extends Component {
  state = {
    forests: false,
    climate_change: false,
    show_pdf: true,
  };

  render() {
    const { forests, climate_change, show_pdf } = this.state;
    let content = null;

    if (show_pdf) {
      content = <WebView useWebKit={true} source={{ uri: APP_ROUTE }} style={{ marginTop: 20 }} />;
    } else {
      content = (
        <View>
          <CheckBox title="Do you care about climate change" checked={climate_change} />

          <CheckBox center title="Click Here" checked={forests} />
        </View>
      );
    }
    return content;
  }
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Hack />
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
