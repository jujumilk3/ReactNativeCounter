import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CounterListItem = (props) => {
  return (
    <View style={style.container}>
      <View style={style.infoContainer}>
        <Text style={style.title}>{props.title}</Text>
        <Text style={style.date}>{props.date}</Text>
      </View>
      <View style={style.countContainer}>
        <Text style={style.count}>{props.count}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  infoContainer: {
    width: '75%',
  },
  title: {
    fontSize: 20,
  },
  date: {
    fontSize: 13,
  },
  countContainer: {
    justifyContent: 'center',
  },
  count: {
    fontSize: 35,
  },
});

export default CounterListItem;
