import { View, Alert, StyleSheet, TouchableOpacity, Image, ScrollView, ImageSourcePropType } from 'react-native';
import React, { useRef, useState } from 'react';
import { Avatar, Text, Button, Card, IconButton } from 'react-native-paper';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { useKidStore } from '@/store/kidStore';
import FlyingImage, { FlyingImageHandle } from '@/components/FlyingStar';

const KidProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { kidId } = route.params as { kidId: string };
  const kid = useKidStore((state) => state.kids.find((k) => k.id === kidId));
  const giveStar = useKidStore((state) => state.giveStar);
  const removeStar = useKidStore((state) => state.removeStar);
  const removeKid = useKidStore((state) => state.removeKid);

  const starTotal = kid?.stars ?? 0;
  const flyingImageRef = useRef<FlyingImageHandle>(null);
  const [flyingImageSource, setFlyingImageSource] = useState<ImageSourcePropType | null>(null);

  const handleRemoveKid = () => {
    removeKid(kidId);
    navigation.navigate('Dashboard');
  };

  const handleStarComplete = () => {
    setFlyingImageSource(null);
  };

  const starOptions = [
    {
      label: 'Blue Star',
      image: require('../assets/stars/blue.png'),
    },
    {
      label: 'Gold Star',
      image: require('../assets/stars/gold.png'),
    },
    {
      label: 'Pink Star',
      image: require('../assets/stars/pink.png'),
    },
    {
      label: 'Smiley Face Star',
      image: require('../assets/stars/smileyFace.png'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.kidInfo}>
        <Avatar.Image
          size={100}
          source={kid?.gender === 'male' ? require('../assets/childAvatars/boy.png') : require('../assets/childAvatars/girl.png')}
        />
        <Text style={styles.kidName}>{kid?.name}</Text>
      </View>

      <View style={styles.starTotalContainer}>
        <Text style={styles.starTotal}>⭐ Stars: {starTotal}/20</Text>
        {kid && (
          <IconButton
            icon="minus-circle-outline"
            size={28}
            onPress={() => removeStar(kid.id)}
            disabled={kid.stars <= 0}
            accessibilityLabel="Remove a star"
          />
        )}
      </View>

      <Text style={styles.sectionHeader}>Choose Star</Text>

      <View style={styles.starContainer}>
        {starOptions.map((star, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardTouchable}
            onPress={() => {
              if (!kid) return;

              // Update stars immediately
              giveStar(kid.id);

              const newStars = kid.stars + 1;
              if (newStars >= 20) {
                Alert.alert('🎉 Prize Won!', 'You earned 20 stars and won a prize!');
              }

              // Then run the animation for visual feedback
              setFlyingImageSource(star.image);
              setTimeout(() => {
                flyingImageRef.current?.start();
              }, 50);
            }}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Image source={star.image} style={styles.starImage} />
                <Text style={styles.cardText}>{star.label}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <Button mode="contained" style={styles.removeButton} onPress={handleRemoveKid}>
        Remove Kid
      </Button>

      {flyingImageSource && <FlyingImage ref={flyingImageRef} source={flyingImageSource} onComplete={handleStarComplete} style={styles.starImage} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  kidInfo: {
    alignItems: 'center',
    gap: 12,
  },
  kidName: {
    fontSize: 32,
    fontWeight: '500',
    color: 'black',
  },
  starTotalContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
  },
  starTotal: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
    alignSelf: 'center',
    color: 'black',
  },
  starContainer: {
    gap: 12,
  },
  cardTouchable: {
    width: '100%',
  },
  card: {
    width: '100%',
    borderRadius: 12,
    elevation: 2,
    backgroundColor: 'white',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  starImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 18,
    color: 'black',
  },
  removeButton: {
    marginTop: 90,
    backgroundColor: '#d9534f',
  },
});

export default KidProfileScreen;
