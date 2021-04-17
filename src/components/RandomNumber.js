import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet} from 'react-native';

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
  };

  render() {
    return (
      <View >
        <Text style={styles.number}>{this.props.number}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  number: {
    fontSize: 35,
    backgroundColor: '#efa13b',
    textAlign: 'center',
    width: 150,
    marginHorizontal: 15,
    marginVertical: 25,
    borderRadius: 30,
  }
});

export default RandomNumber;
