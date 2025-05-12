import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type FeatureRowProps = {
  text: string;
};

const FeatureRow: React.FC<FeatureRowProps> = ({text}) => {
  return (
    <View style={styles.row}>
      <MaterialIcons
        name="circle"
        size={18}
        color="#16a34a"
        style={styles.icon}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default React.memo(FeatureRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
});
