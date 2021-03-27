import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import { MainButton } from '../components/MainButton';
import { Card } from '../components/Card';
import Color from '../constants/color';

export const GameOverScreen = ({ numOfRounds, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.gameoverContainer}>
        <Text style={DefaultStyles.title}>Game Over</Text>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require('../assets/success.png')}
          />
        </View>
        <View style={styles.results}>
          <Text style={DefaultStyles.bodyText}>
            Number of rounds: {numOfRounds}
          </Text>
          <Text style={DefaultStyles.bodyText}>
            Number guessed: {userNumber}
          </Text>
        </View>
        <MainButton
          style={{ backgroundColor: Color.primary, marginVertical: 10 }}
          onPress={onRestart}>
          NEW GAME
        </MainButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    },
    gameoverContainer: {
      alignItems: 'center'
    },
    results: {
        marginVertical: 10
    }
});
