import React from 'react';
import PropTypes from 'prop-types';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
  };

  handlePress = () => {
    console.log(this.props.number);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={styles.number}>{this.props.number}</Text>
      </TouchableOpacity>
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
