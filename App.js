/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Avatar, Badge, Icon, withBadge, Button } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import Pdf from 'react-native-pdf';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const APP_ROUTE = 'http://34.94.236.97:80/letter.pdf';

class Hack extends Component {
  state = {
    forests: false,
    climate_change: false,
    show_pdf: false,
  };

  do_make_pdf = () => {
    this.setState({ show_pdf: true });
  };

  render() {
    const { forests, climate_change, show_pdf } = this.state;
    let content = null;
    const source = { uri: APP_ROUTE, cache: false };
    if (show_pdf) {
      content = (
        <View>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            style={styles.pdf}
          />
          <Button
            style={{ marginBottom: 50 }}
            title={'Leave generated PDF'}
            onPress={() => this.setState({ show_pdf: false })}
          />
        </View>
      );
    } else {
      content = (
        <View>
          <CheckBox title="Do you care about climate change" checked={climate_change} />
          <CheckBox center title="Click Here" checked={forests} />
          <Button title={'Generate PDF for your congressperson'} onPress={this.do_make_pdf} />
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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
