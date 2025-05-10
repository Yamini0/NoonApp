import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

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
  }: {
    item: any;
    onPress?: (e: GestureResponderEvent) => void;
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
          {(item.tags || []).map((tag: string, idx: number) => (
            <Text key={idx} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
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
});
