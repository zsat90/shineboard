import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Animated, Dimensions, ImageSourcePropType, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export type FlyingImageHandle = {
  start: () => void;
};

type FlyingImageProps = {
  source: ImageSourcePropType;
  style?: any;
  onComplete?: () => void;
};

const FlyingImage = forwardRef<FlyingImageHandle, FlyingImageProps>(({ source, style, onComplete }, ref) => {
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    start: () => {
      // Reset values
      translateYAnim.setValue(0);
      translateXAnim.setValue(0);
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
      setVisible(true);

      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -SCREEN_HEIGHT / 3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: SCREEN_WIDTH / 5 - 20, // Move roughly to center
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 3, // Grow
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0, // Fade out
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
        onComplete?.();
      });
    },
  }));

  if (!visible) return null;

  return (
    <Animated.Image
      source={source}
      style={[
        styles.image,
        style,
        {
          transform: [{ translateY: translateYAnim }, { translateX: translateXAnim }, { scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    />
  );
});

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 2 - 10,
    left: SCREEN_WIDTH / 2 - 10,
    width: 40,
    height: 40,
  },
});

export default FlyingImage;
