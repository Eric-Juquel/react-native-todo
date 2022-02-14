import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  completed: boolean | null;
  setCompleted: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Navigation: React.FC<Props> = ({completed, setCompleted}) => {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCompleted(null)}>
        <Text style={completed === null ? styles.active : styles.text}>
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCompleted(false)}>
        <Text style={completed === false ? styles.active : styles.text}>
          Active
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCompleted(true)}>
        <Text style={completed === true ? styles.active : styles.text}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  navContainer: {
    width: 350,
    marginTop: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {width: 80},
  text: {
    color: '#5b5b5b',
    fontSize: 15,
    fontWeight: '200',
  },
  active: {
    color: '#070707',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
