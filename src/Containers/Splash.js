import React from 'react';
import LottieView from 'lottie-react-native';
import firebase from 'react-native-firebase';

type Props = {
  navigation: Object,
};
class Login extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.auth();
  }

  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'SignedIn' : 'SignedOut');
    });
  };

  render() {
    return (
      <LottieView source={require('../Animations').loader} autoPlay loop />
    );
  }
}

export default Login;
