import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Color from '../constants/color';

export const MainButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <View style={{...styles.buttonContainer, ...props.style}}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Color.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
        borderRadius: 60,
        alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: Color.white,
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});
