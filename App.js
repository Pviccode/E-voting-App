import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import VotePage from './Screens/VotePage';

export default function App() {
  return (
    <View style={styles.container}>
      <VotePage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
