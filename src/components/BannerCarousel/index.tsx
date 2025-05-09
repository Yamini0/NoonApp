import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ViewToken,
} from 'react-native';
import {BannerCarouselPropsType} from './BannerCarousel.type';

const {width} = Dimensions.get('window');
const ITEM_SPACING = 8;
const ITEM_WIDTH = width * 0.9;
const SNAP_INTERVAL = ITEM_WIDTH + ITEM_SPACING;

const BannerCarousel = ({banners}: BannerCarouselPropsType) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= banners.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item}) => (
          <View style={styles.bannerWrapper}>
            <Image source={{uri: item.image}} style={styles.bannerImage} />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />
      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 22,
    // paddingHorizontal: SIDE_SPACING,
  },
  bannerWrapper: {
    width: ITEM_WIDTH,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#a4a4a3',
  },
});
