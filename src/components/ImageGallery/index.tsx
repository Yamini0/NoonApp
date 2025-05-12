import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface ImageGalleryProps {
  image: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({image}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
    </View>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 300,
    backgroundColor: '#f3f3f3',
    alignSelf: 'center',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
});
