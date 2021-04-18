import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

import {View, Text, StyleSheet} from 'react-native';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state = {
    selectedIds: [],
  };
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
    // TODO: Shuffle random numbers array

  isNumberSelected = (indexNum) => {
    return this.state.selectedIds.indexOf(indexNum) >= 0;
  };

  selectNumber = (indexNum) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, indexNum],
    }));
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  }

  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.numberContainer}>
          {this.randomNumbers.map((randomNumber, idx) =>
            <RandomNumber
              key={idx}
              id={idx}
              number={randomNumber}
              isDisabled={this.isNumberSelected(idx)}
              onPress={this.selectNumber}
            />
          )}
        </View>
        <Text style={styles.target}>{gameStatus}</Text>
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
    borderRadius: 10,
  },

  numberContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  STATUS_PLAYING: {
    backgroundColor: '#3befa1',
  },

  STATUS_WON: {
    backgroundColor: 'white',
  },

  STATUS_LOST: {
    backgroundColor: 'red',
  },

});

export default Game;
