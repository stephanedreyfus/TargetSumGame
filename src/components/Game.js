import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

import {View, Text, Button, StyleSheet} from 'react-native';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };
  gameStatus = 'PLAYING';
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  shuffledRandomNumbers = shuffle(this.randomNumbers);

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1};
      }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isNumberSelected = (indexNum) => {
    return this.state.selectedIds.indexOf(indexNum) >= 0;
  };

  selectNumber = (indexNum) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, indexNum],
    }));
  };

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      nextState.selectedIds !== this.state.selectedIds ||
      nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState);
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }

  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    if (nextState.remainingSeconds === 0) {
      return 'LOST';
    }
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
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.numberContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, idx) =>
            <RandomNumber
              key={idx}
              id={idx}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(idx) || gameStatus !== 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          )}
        </View>
        {this.gameStatus !== 'PLAYING' && (
          <Button title='Play Again' onPress={this.props.onPlayAgain} />
        )}
        <Text style={[styles.counter, styles[`STATUS_${gameStatus}`]]}>
          {`You Have ${this.state.remainingSeconds} seconds remaining!`}
        </Text>
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

  counter: {
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
    borderRadius: 10,
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
