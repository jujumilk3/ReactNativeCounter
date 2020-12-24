import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Modal, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import styles from './CounterScreen.style';
import {DATE_TIME_FORMAT} from '../Constants';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CounterScreen = ({navigation}) => {
  /** variables declaration */
  const [count, setCount] = useState(0);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  /** init function */
  useEffect(() => {
    const countClear = navigation.addListener('focus', () => {
      setCount(0);
    });
    return () => {
      countClear();
    };
  }, [navigation]);
  /** component function */
  const _onPressCounterButton = (division) => {
    if (division === 'up') {
      setCount(count + 1);
    } else if (division === 'down') {
      setCount(count - 1);
    }
  };
  const _onPressSaveButton = () => {
    const currentDate = moment().format(DATE_TIME_FORMAT);
    setDate(currentDate);
    setTitle(currentDate);
    setSaveModalVisible(!saveModalVisible);
  };
  const _onPressSaveConfirmButton = async () => {
    const counterObject = {
      title: title,
      date: date,
      count: count,
    };
    try {
      await AsyncStorage.setItem(date, JSON.stringify(counterObject));
    } catch (e) {
      Alert.alert('Save Failed');
    }
    setSaveModalVisible(!saveModalVisible);
    setCount(0);
  };
  /** render */
  return (
    <View style={styles.background}>
      <View style={styles.counterWrap}>
        <Text style={styles.counter}>{count}</Text>
      </View>
      <View style={styles.buttonWrap}>
        <Button
          icon={<IconMI name="keyboard-arrow-up" size={50} color="white" />}
          onPress={() => _onPressCounterButton('up')}
          buttonStyle={styles.counterButton}
        />
        <Button
          icon={<IconMI name="keyboard-arrow-down" size={50} color="white" />}
          onPress={() => _onPressCounterButton('down')}
          buttonStyle={styles.counterButton}
        />
        <View style={styles.methodButtonContainer}>
          <Button
            icon={<IconMI name="save" size={50} color="white" />}
            onPress={() => _onPressSaveButton()}
            buttonStyle={styles.saveButton}
          />
          <Button
            icon={<IconMI name="close" size={50} color="white" />}
            onPress={() => setCount(0)}
            buttonStyle={styles.closeButton}
          />
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={saveModalVisible}>
        <View style={styles.saveModalContainer}>
          <View style={styles.saveModalView}>
            <TextInput
              style={styles.saveTitleInput}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <View style={styles.saveModalButtonContainer}>
              <Button
                title="Save"
                titleStyle={{color: 'black'}}
                type="clear"
                onPress={() => _onPressSaveConfirmButton()}
              />
              <Button
                title="Cancel"
                titleStyle={{color: 'black'}}
                type="clear"
                onPress={() => {
                  setSaveModalVisible(!saveModalVisible);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CounterScreen;
