import React from 'react';
import { View, Button } from 'react-native';
import firebase from 'react-native-firebase';

class Login extends React.Component {
  render() {
    return (
      <View>
        <Button title="press me" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}

export default Login;
