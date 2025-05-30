import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const ERROR_LOTTIE = require('../../assets/lottie/error.json');

export const ErrorScreen = () => {
  const lottieRef = React.useRef<LottieView>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        source={ERROR_LOTTIE}
        resizeMode="contain"
        loop
        autoPlay
        style={styles.lottieView}
      />

      <Text style={styles.message}>Opps! something went wrong...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#7a7a7a',
  },
  lottieView: {
    width: 300,
    height: 300,
  },
});
