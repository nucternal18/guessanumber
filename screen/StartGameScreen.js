import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
    Alert,
  Dimensions
} from 'react-native';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { NumberContainer } from '../components/NumberContainer';
import { MainButton } from '../components/MainButton';
import Color from '../constants/color';
import DefaultStyles from '../constants/default-styles';

export const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const inputHandler = (input) => {
    setEnteredValue(input.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid input', 'Number has to be between 1 and 99', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      setEnteredValue('');
      setConfirmed(false);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text style={DefaultStyles.bodyText}>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            value={enteredValue}
            onChangeText={(text) => setEnteredValue(text)}
          />
          <View style={styles.buttonContainer}>
            <MainButton style={styles.resetButton} onPress={resetInputHandler}>
              Reset
            </MainButton>

            <MainButton
              onPress={confirmInputHandler}
              style={styles.confirmButton}>
              Confirm
            </MainButton>
          </View>
        </Card>
        {!!confirmed && (
          <Card style={styles.summaryContainer}>
            <Text> You Selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => onStartGame(selectedNumber)}>
              START GAME
            </MainButton>
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: {
    minWidth: 300,
    maxWidth: '95%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  resetButton: {
    width: Dimensions.get('window').width / 3,
    backgroundColor: Color.accent,
  },
  confirmButton: {
    width: Dimensions.get('window').width / 3,
    backgroundColor: Color.primary,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
