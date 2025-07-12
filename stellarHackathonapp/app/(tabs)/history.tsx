import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

export default function HistoryScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F5F5F5', dark: '#222' }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.container}>
        {/* History content goes here */}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
});
