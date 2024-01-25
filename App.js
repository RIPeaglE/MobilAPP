import { StyleSheet, Text, View, Button, } from 'react-native';
import Navigator from './routes/homeStack'

export default function App() {
    return (
        <Navigator/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 30,
    padding: 10,
  },
});