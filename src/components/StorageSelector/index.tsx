import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

type StorageSelectorProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

const StorageSelector: React.FC<StorageSelectorProps> = ({
  options,
  selected,
  onSelect,
}) => {
  const renderItem = ({item}: {item: string}) => {
    const isSelected = selected === item;

    return (
      <TouchableOpacity
        onPress={() => onSelect(item)}
        style={[
          styles.option,
          isSelected ? styles.selectedOption : styles.unselectedOption,
        ]}>
        <Text
          style={[
            styles.optionText,
            isSelected ? styles.selectedText : styles.unselectedText,
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Storage</Text>
      <FlatList
        horizontal
        data={options}
        renderItem={renderItem}
        keyExtractor={item => item}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(StorageSelector);

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  list: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
  },
  unselectedOption: {
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#1e293b',
  },
});
