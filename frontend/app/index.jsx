import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  // Shared values
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  const logoTranslateY = useSharedValue(-60);
  const textTranslateY = useSharedValue(40);


  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 1200 });
    logoTranslateY.value = withSpring(0, {
      damping: 12,
      stiffness: 180,
    });

    textOpacity.value = withTiming(1, { duration: 1200, delay: 300 });
    textTranslateY.value = withSpring(0, {
      damping: 12,
      stiffness: 180,
    });

    const timer = setTimeout(() => {
      setShowSplash(false);
      router.push("/home")

    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splash}>
        <Animated.View style={logoAnimatedStyle}>
          <Image
            source={require('../assets/clapper.png')}
            style={styles.logo}
          />
        </Animated.View>

        <Animated.Text style={[styles.title, textAnimatedStyle]}>
          CinéTanger
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, textAnimatedStyle]}>
          YOUR TICKET TO MAGIC
        </Animated.Text>
      </View>
    );
  }

 
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#120000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    color: '#E50914',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 14,
    letterSpacing: 2,
  },
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
