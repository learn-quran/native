import React from 'react';
import Sound from 'react-native-sound';
import { View, Dimensions } from 'react-native';
import { IconButton, Text, Button } from 'react-native-paper';

import {
  getRandomDatom,
  getRandomAsset,
  getFourRandomDatoms,
} from '../Assets/Audio';
import { DropDown } from '../Components';
import { withTranslation } from 'react-i18next';
import { withFirebase } from '../Firebase';
import { AfterPlay } from '../Components';

type Props = {
  firebase: Object,
  t: Function,
};
type State = {
  won: boolean,
  lost: boolean,
  user: Object,
};
class Player extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      won: false,
      lost: false,
      user: {},
    };
    this.initalize();
  }

  componentDidMount() {
    this.getAsset();
    this.persistUserInfo();
  }
  componentWillUnmount() {
    this.sound.release();
  }

  getAsset = () => {
    this.props.firebase
      .getAsset(getRandomAsset(this.datom))
      .then(url => this.loadAndPlay(url))
      .catch(() => {
        DropDown.error(
          this.props.t(
            'something-went-wrong-please-restart-the-app-and-try-again',
          ),
        );
      });
  };
  persistUserInfo = () => {
    this.props.firebase
      .getUser()
      .then(user => {
        this.setState({ user });
      })
      .catch(() => {
        DropDown.error(
          this.props.t(
            'something-went-wrong-please-restart-the-app-and-try-again',
          ),
        );
      });
  };
  initalize = (reset = false) => {
    this.datom = getRandomDatom();
    this.datoms = getFourRandomDatoms(this.datom);
    this.points = 3;
    if (reset) {
      this.setState({
        won: false,
        lost: false,
      });
      this.getAsset();
    }
  };
  loadAndPlay = (url: string) => {
    this.sound = new Sound(url, '', error => {
      if (error) {
        DropDown.error(
          this.props.t(
            'something-went-wrong-please-restart-the-app-and-try-again',
          ),
        );
      } else {
        this.sound.play();
      }
    });
  };

  handleResetClick = () => {
    this.sound.stop(() => this.sound.play());
  };
  handleAnswerClick = index => {
    const { t, firebase } = this.props;
    if (this.datoms[index].index === this.datom.index) {
      this.setState({
        won: true,
      });
      this.sound.pause();
      firebase
        .updateUserPoints(this.points)
        .then(() => {
          DropDown.success(
            t('congratulations-you-earned-n-points', { points: this.points }),
            `${t('good-job')}!`,
          );
          this.persistUserInfo();
        })
        .catch(() => {
          DropDown.error(
            t(
              'there-was-an-error-adding-your-points-please-contact-us-to-fix-it',
            ),
          );
        });
    } else {
      DropDown.warn(t('try-again'), `${t('luck-wasnt-on-your-side')} :(`);
      this.datoms[index].disabled = true;
      this.points -= 1;
      if (this.points === 0) {
        this.setState({ lost: true });
        this.sound.pause();
      } else {
        this.forceUpdate();
      }
    }
    firebase.updateUserLastPlayed(new Date());
  };

  render() {
    const { t } = this.props;
    const { user, lost, won } = this.state;
    return (
      <View style={styles.container}>
        {!!user.uid && (
          <View style={styles.yourPointsContainer}>
            <Text style={styles.yourPointsDefault}>{t('your-points')}</Text>
            <View style={styles.yourPointsContent}>
              <Text style={styles.yourPoints}>{user.points}</Text>
            </View>
          </View>
        )}
        {lost ? (
          <AfterPlay
            animation="onLose"
            init={this.initalize}
            buttonText={t('play-again')}
          />
        ) : won ? (
          <AfterPlay
            animation="onWin"
            init={this.initalize}
            buttonText={t('play-again')}
          />
        ) : (
          <React.Fragment>
            <View style={styles.resetContainer}>
              <IconButton
                icon="refresh"
                size={32}
                onPress={this.handleResetClick}
              />
            </View>
            <View style={styles.buttonsContainer}>
              {this.datoms.map((datom, i) => (
                <Button
                  key={i}
                  mode="outlined"
                  disabled={datom.disabled}
                  style={styles.button(datom.disabled)}
                  onPress={() => this.handleAnswerClick(i)}>
                  <Text
                    numberOfLines={1}
                    style={styles.buttonText(datom.disabled)}>
                    {datom.name[t('lang-code')]}
                  </Text>
                </Button>
              ))}
            </View>
          </React.Fragment>
        )}
      </View>
    );
  }
}

const { height, width } = Dimensions.get('screen');
const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 30,
  },
  yourPointsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourPointsDefault: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    paddingBottom: 4,
  },
  yourPointsContent: {
    backgroundColor: 'rgba(254, 227, 193, 0.7)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourPoints: {
    fontSize: 20,
    fontWeight: '400',
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  resetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: disabled => ({
    width: width * 0.55,
    borderWidth: 1.15,
    borderColor: disabled ? '#4F4F4F' : '#B9994E',
  }),
  buttonText: disabled => ({
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: 21,
    color: disabled ? '#4F4F4F' : '#B9994E',
  }),
};

export default withTranslation()(withFirebase(Player));
