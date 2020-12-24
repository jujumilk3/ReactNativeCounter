import React from 'react';
import {Calendar} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {
  Alert,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import CounterListItem from '../components/CounterListItem';
import {DATE_FORMAT} from '../Constants';

class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearMonth: moment().format('YYYY-MM'),
      selectedDate: moment().format(DATE_FORMAT),
      markedDates: {},
      selectedCountItems: {},
    };
  }
  async componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.updateCalendar();
      this.updateCountListItem(this.state.selectedDate);
    });
  }
  async getSelectedKeys() {
    let everyKeys = [];
    let selectedKeys = [];
    try {
      everyKeys = await AsyncStorage.getAllKeys();
      everyKeys.reverse();
      everyKeys.forEach((value) => {
        if (value.startsWith(this.state.yearMonth)) {
          selectedKeys.push(value);
        }
      });
    } catch (e) {
      Alert.alert('Error', 'Calendar marks load error');
    }
    return selectedKeys;
  }
  updateCalendar() {
    let markedDates = {};
    this.getSelectedKeys().then((response) => {
      response.forEach((value) => {
        let date = value.split(' ')[0];
        markedDates[date] = {marked: true};
      });
      this.setState({markedDates: markedDates});
    });
  }
  monthChange(dateObject) {
    this.state.yearMonth = dateObject.year + '-' + dateObject.month;
    this.updateCalendar();
  }
  async deleteCountItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      Alert.alert('Delete error');
    }
    this.updateCountItems();
  }
  async updateCountListItem(date) {
    let everyKeys = [];
    let selectedKeys = [];
    let items = [];
    let result = [];
    try {
      everyKeys = await AsyncStorage.getAllKeys();
      everyKeys.reverse();
      everyKeys.forEach((value) => {
        if (value.startsWith(date)) {
          selectedKeys.push(value);
        }
      });
    } catch (e) {
      Alert.alert('Error', 'List load error');
    }
    items = await AsyncStorage.multiGet(selectedKeys);
    items.forEach((value) => {
      let currentCountItem = JSON.parse(value[1]);
      result.push(currentCountItem);
    });
    this.setState({countItems: result});
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          monthFormat={'yyyy - MM'}
          onDayPress={(dateObject) => {
            this.setState({selectedDate: dateObject.dateString});
            this.updateCountListItem(dateObject.dateString);
          }}
          onMonthChange={(dateObject) => {
            this.monthChange(dateObject);
          }}
          markedDates={this.state.markedDates}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.state.selectedDate}</Text>
        </View>
        <ScrollView>
          {this.state.countItems &&
            this.state.countItems.map((prop, key) => (
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

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  counterItemListContainer: {
    marginTop: 10,
  },
});
