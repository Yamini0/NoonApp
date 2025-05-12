import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const HorizontalProductCard = React.memo(
  ({
    item,
    onPress,
  }: {
    item: any;
    onPress?: (e: GestureResponderEvent) => void;
  }) => (
    <TouchableOpacity style={styles.horizontalCard} onPress={onPress}>
      <Image source={{uri: item.image}} style={styles.horizontalImage} />
      <Text numberOfLines={1} style={styles.productName}>
        {item.name}
      </Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  ),
);

export const VerticalProductCard = React.memo(
  ({
    item,
    onPress,
    onIncrement,
    onDecrement,
    onRemove,
    showQuantityControls = false,
    quantity,
  }: {
    item: any;
    onPress?: (e: GestureResponderEvent) => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onRemove?: () => void;
    showQuantityControls?: boolean;
    quantity: number | string;
  }) => (
    <TouchableOpacity style={styles.verticalCard} onPress={onPress}>
      <Image source={{uri: item.image}} style={styles.verticalImage} />
      <View style={styles.rightContainer}>
        <View style={styles.verticalInfo}>
          <Text numberOfLines={1} style={styles.productName}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
        <View style={styles.tagContainer}>
          {(item?.tags || []).map((tag: string, idx: number) => (
            <Text key={idx} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>

        {showQuantityControls && (
          <View style={styles.quantityContainer}>
            <View style={styles.quantityButtons}>
              <TouchableOpacity
                onPress={onDecrement}
                style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.quantityText, {color: '#000'}]}>
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={onIncrement}
                style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
              <MaterialIcons name="delete" color="#e53935" size={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  ),
);

const styles = StyleSheet.create({
  horizontalCard: {
    width: 140,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 8,
    elevation: 2,
  },
  horizontalImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  verticalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  verticalImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  rightContainer: {
    padding: 10,
  },
  verticalInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: 8,
  },
  tag: {
    backgroundColor: '#e0f0ff',
    color: '#007bff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e4e4e4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  removeButton: {
    marginLeft: 16,
    borderRadius: 8,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  removeText: {
    color: '#e53935',
    fontSize: 14,
    fontWeight: '500',
  },
});
