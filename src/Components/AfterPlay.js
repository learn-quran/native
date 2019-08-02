import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  animation: 'onWin' | 'onLose',
  init: Function,
  buttonText: string,
};
const AfterPlay = ({ animation, init, buttonText }: Props) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../Animations')[animation]}
        autoPlay
        loop={false}
        style={styles.animation}
        resizeMode="cover"
      />
      <Button mode="contained" onPress={() => init(true)} style={styles.button}>
        {buttonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  animation: {
    width: '70%',
  },
  button: {
    padding: 8,
    fontSize: 18,
  },
});

export default AfterPlay;
