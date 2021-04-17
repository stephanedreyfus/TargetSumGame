import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

import {View, Text, StyleSheet} from 'react-native';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
    // TODO: Shuffle random numbers array
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.numberContainer}>
          {this.randomNumbers.map((randomNumber, idx) =>
            // <Text style={styles.number} key={idx}>{randomNumber}</Text>
            <RandomNumber key={idx} number={randomNumber} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#a13bef',
    flex: 1,
    paddingTop: 30,
  },

  target: {
    fontSize: 40,
    margin: 50,
    textAlign: 'center',
    backgroundColor: '#3befa1',
    borderRadius: 10,
  },

  numberContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  
});

export default Game;
