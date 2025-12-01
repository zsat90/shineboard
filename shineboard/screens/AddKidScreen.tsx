import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, TextInput, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import { addKidHelper } from '@/utils/kidHelper';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/RootNavigator';

const AddKidScreen = () => {
  const handleAddKid = async () => {
    if (!text.trim()) {
      return Alert.alert('Name is required');
    }

    try {
      await addKidHelper(text, gender);
      navigation.navigate('Dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert('Could not add kid', message);
    }
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [text, setText] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | undefined>(undefined);

  <IconButton icon="arrow-left" size={24} onPress={() => navigation.navigate('Dashboard')} />;

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>New Kid</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Name"
          value={text}
          onChangeText={setText}
          mode="outlined"
          style={styles.input}
          outlineColor="#aaa"
          activeOutlineColor="#6200ee"
          textColor="black"
          placeholder="Enter name"
        />
        <Dropdown
          data={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select Gender"
          value={gender}
          onChange={(item) => setGender(item.value)}
          style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 8, padding: 14, marginBottom: 22 }}
          placeholderStyle={{ color: 'gray' }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button icon="plus" mode="contained" buttonColor="#1363ed" textColor="white" onPress={handleAddKid}>
          Add
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 'auto',
    width: '90%',
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 18,
    fontSize: 18,
  },

  headerContainer: {
    marginTop: 40,
    marginBottom: 30,
    textAlign: 'left',
    marginLeft: 25,
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },

  buttonContainer: {
    marginTop: 70,
    margin: 20,
  },
});

export default AddKidScreen;
