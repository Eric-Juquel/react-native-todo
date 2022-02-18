import {StyleSheet, View} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Props {
  completed: boolean;
  updateCompleted(): void;
}

const TaskUpdate: React.FC<Props> = ({completed, updateCompleted}) => {
  return (
    <View>
      <BouncyCheckbox
        size={25}
        fillColor="teal"
        unfillColor="#FFFFFF"
        isChecked={completed}
        disableBuiltInState
        iconStyle={completed ? styles.completed : styles.pending}
        onPress={updateCompleted}
      />
    </View>
  );
};

export default TaskUpdate;

const styles = StyleSheet.create({
  completed: {borderColor: 'teal'},
  pending: {borderColor: '#0093ff'},
});
