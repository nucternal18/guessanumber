import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Header } from './components/Header';
import { StartGameScreen } from './screen/StartGameScreen';
import { GameScreen } from './screen/GameScreen';
import { GameOverScreen } from './screen/GameOverScreen';

// const fetchFonts = async () => {
//   return await Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//   });
// };

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessedRounds, setGuessRounds] = useState(0);
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading onError={(err) => console.log(err)} />;
  }

  const restartGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (num) => {
    setUserNumber(num);
    setGuessRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };
  return (
    <View style={styles.container}>
      <Header title='Guess a Number' />
      {!!userNumber && guessedRounds <= 0 ? (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      ) : guessedRounds > 0 ? (
        <GameOverScreen
          numOfRounds={guessedRounds}
          userNumber={userNumber}
          onRestart={restartGameHandler}
        />
      ) : (
        <StartGameScreen onStartGame={startGameHandler} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
