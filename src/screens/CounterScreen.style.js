import {StyleSheet} from 'react-native';
import {AppStyles} from '../AppStyles';

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  counterWrap: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  counter: {
    fontWeight: 'bold',
    fontSize: 100,
  },
  buttonWrap: {
    width: '100%',
    alignItems: 'center',
    flex: 2,
    padding: 20,
  },
  counterButton: {
    backgroundColor: 'grey',
    width: 200,
    margin: 10,
  },
  methodButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  saveButton: {
    backgroundColor: AppStyles.colors.bluegray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  closeButton: {
    backgroundColor: AppStyles.colors.rosewater,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  saveModalContainer: {
    flex: 1,
    marginTop: 250,
    alignItems: 'center',
  },
  saveModalView: {
    width: 250,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 10,
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
  saveTitleInput: {
    width: 200,
    marginTop: 10,
    height: 30,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 0,
    paddingLeft: 10,
    marginBottom: 10,
  },
  saveModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonLeft: {
    justifyContent: 'flex-start',
  },
  buttonRight: {
    justifyContent: 'flex-end',
  },
});

export default styles;
