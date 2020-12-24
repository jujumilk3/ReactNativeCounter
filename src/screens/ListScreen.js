import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import CounterListItem from '../components/CounterListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countItems: [],
      deleteModalVisible: false,
      refreshing: false,
    };
  }
  async getEveryCountItem() {
    let keys = [];
    let values = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      keys.reverse();
      values = await AsyncStorage.multiGet(keys);
    } catch (e) {
      Alert.alert('Error', 'List load error');
    }
    return values;
  }
  async componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.updateCountItems();
    });
  }
  async deleteCountItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      Alert.alert('Delete error');
    }
    this.updateCountItems();
  }
  updateCountItems() {
    this.getEveryCountItem().then((response) => {
      let countItems = [];
      response.forEach((value) => {
        let currentCountItem = JSON.parse(value[1]);
        countItems.push(currentCountItem);
      });
      this.setState({countItems: countItems});
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {this.state.countItems.map((prop, key) => (
            <Pressable
              onLongPress={() => {
                Alert.alert(prop.title, 'Delete', [
                  {text: 'O', onPress: () => this.deleteCountItem(prop.date)},
                  {text: 'X', onPress: () => Alert.alert('X')},
                ]);
              }}
              key={key}>
              <CounterListItem
                key={key}
                title={prop.title}
                date={prop.date}
                count={prop.count}
              />
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
