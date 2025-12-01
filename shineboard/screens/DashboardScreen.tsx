import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button, Avatar, Text, Card } from 'react-native-paper';
import { useKidStore } from '@/store/kidStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/RootNavigator';

const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const kidsList = useKidStore((state) => state.kids);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Kids</Text>

      {kidsList.length > 0 ? (
        <ScrollView contentContainerStyle={styles.kidList}>
          {kidsList.map((kid) => (
            <TouchableOpacity key={kid.id} onPress={() => navigation.navigate('Profile', { kidId: kid.id })}>
              <Card style={styles.kidCard}>
                <View style={styles.kidInfo}>
                  <Avatar.Image
                    size={48}
                    source={kid.gender === 'male' ? require('../assets/childAvatars/boy.png') : require('../assets/childAvatars/girl.png')}
                  />
                  <Text style={styles.kidName}>{kid.name}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noKidsText}>No kids added yet.</Text>
      )}

      <Button
        icon="plus"
        mode="contained"
        buttonColor="#1363ed"
        textColor="white"
        onPress={() => navigation.navigate('Add')}
        style={styles.addButton}
        contentStyle={{ paddingVertical: 8 }}
      >
        Add Child
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: 'black',
  },
  kidList: {
    paddingBottom: 16,
  },
  kidCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
  },
  kidInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  kidName: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  noKidsText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 40,
  },
  addButton: {
    marginTop: 'auto',
    marginBottom: 24,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 8,
  },
});

export default DashboardScreen;
