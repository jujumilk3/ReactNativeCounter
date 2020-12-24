import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {DATE_TIME_FORMAT} from '../Constants';

const OtherScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, onChangeText] = useState('Placeholder');
  const _onPressModalButton = () => {
    setModalVisible(!modalVisible);
  };
  const _onPressSaveButton = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      // saving error
    }
    Alert.alert('did save');
  };
  const _onPressLoadButton = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
      }
      Alert.alert(value);
    } catch (e) {
      // error reading value
    }
  };
  const _onPressDeleteButton = () => {
    try {
      AsyncStorage.removeItem('2020-11-20 10:43:34');
    } catch (e) {
      // error reading value
    }
  };
  const _onPressDateCheckButton = async () => {
    const date = moment().format(DATE_TIME_FORMAT);
    Alert.alert(date);
  };
  const _onAsyncStorageCheckButton = async () => {
    let keys = [];
    let values = {};
    try {
      keys = await AsyncStorage.getAllKeys();
      values = await AsyncStorage.multiGet(keys);
    } catch (e) {
      // read key error
    }
    console.log(keys);
    console.log(values);
  };
  const _onAsyncStorageRemoveButton = async () => {
    try {
      // await AsyncStorage.clear();
    } catch (e) {
      // read key error
    }
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => onChangeText(text)}
              value={textInputValue}
            />
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                Alert.alert(textInputValue);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Button
        title="Modal Button"
        onPress={() => _onPressModalButton()}
        buttonStyle={styles.button}
      />
      <Button
        title="Save Button"
        onPress={() => _onPressSaveButton('The value is Test')}
        buttonStyle={styles.button}
      />
      <Button
        title="Load Button"
        onPress={() => _onPressLoadButton()}
        buttonStyle={styles.button}
      />
      <Button
        title="Delete Button"
        onPress={() => _onPressDeleteButton()}
        buttonStyle={styles.button}
      />
      <Button
        title="Date check Button"
        onPress={() => _onPressDateCheckButton()}
        buttonStyle={styles.button}
      />
      <Button
        title="Asyncstorage check"
        onPress={() => _onAsyncStorageCheckButton()}
        buttonStyle={styles.button}
      />
      <Button
        title="Remove asyncstorage"
        onPress={() => _onAsyncStorageRemoveButton()}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default OtherScreen;
