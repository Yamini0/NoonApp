import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface ColorSelectorProps {
  options: string[];
  selected: string;
  onSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Color</Text>
      <View style={styles.optionsRow}>
        {options?.map(color => {
          const isSelected = selected === color;
          return (
            <TouchableOpacity
              key={color}
              style={[styles.option, isSelected && styles.selectedOption]}
              onPress={() => onSelect(color)}>
              <Text
                style={[styles.optionText, isSelected && styles.selectedText]}>
                {color}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(ColorSelector);

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#d1d5db',
    minWidth: 80,
  },
  selectedOption: {
    borderColor: '#2563eb',
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
