import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { NumberContainer } from '../components/NumberContainer';
import { Card } from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import { MainButton } from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';

const generateRandomNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNum(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (guess, numOfRnd) => {
  return (
    <View key={guess} style={styles.listItem}>
      <Text style={DefaultStyles.bodyText}># Rounds:{numOfRnd}</Text>
      <Text style={DefaultStyles.bodyText}># Guesses:{guess}</Text>
    </View>
  );
};

export const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomNum(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuess = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNum = generateRandomNum(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);
    setPastGuesses((currentPastGuesses) => [nextNum, ...currentPastGuesses]);
  };
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess'</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuess.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuess.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 200,
    maxWidth: '80%',
    },
    list: {
        flex: 1,
      width: '80%'
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
      flexDirection: 'row',
    justifyContent: 'space-around'
  },
});
