// @flow
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import { withTranslation } from 'react-i18next';

type Props = {
  t: Function,
  navigation: Object,
};
class Walkthrough extends React.Component<Props> {
  slides: Object;
  constructor(props) {
    super(props);
    const { t } = props;
    const fontFamily = t('lang-code') === 'en' ? 'Rajdhani' : 'Amiri';
    this.slides = [
      {
        key: 'index',
        text: `${t('learn-quran')} ${t(
          'is-a-hybrid-platform-for-testing-your-knowledge-in-the-holy-quran',
        )}`,
        textStyle: {
          color: '#B9994E',
          fontSize: 24,
          fontWeight: '700',
          fontFamily,
        },
        image: require('../Assets/Images').logo,
        imageStyle: {
          width: 300,
          height: 300,
        },
        backgroundColor: '#f4f0eb',
      },
      {
        key: 'how-to-play',
        title: t('how-to-play'),
        titleStyle: {
          ...styles.titleStyle,
          fontFamily,
        },
        text: t('walkthrough-how-to-play-paragprah'),
        textStyle: {
          ...styles.textStyle,
          fontFamily,
        },
        image: require('../Animations').howToPlay,
        imageStyle: {
          width: 360,
          height: 360,
        },
        backgroundColor: '#f4f0eb',
      },
      {
        key: 'inspiration',
        title: t('inspiration'),
        titleStyle: {
          ...styles.titleStyle,
          fontFamily,
        },
        text: t('walkthrough-inspiration-paragprah'),
        textStyle: {
          ...styles.textStyle,
          fontSize: 20,
        },
        image: require('../Animations').inspiration,
        imageStyle: {
          width: 275,
          height: 275,
        },
        backgroundColor: '#f4f0eb',
      },
    ];
  }

  _renderNextButton = () => (
    <View style={styles.iconContainer}>
      <Icon
        name={this.props.t('lang-code') === 'en' ? 'arrow-right' : 'arrow-left'}
        size={26}
        style={styles.icon}
      />
    </View>
  );
  _renderDoneButton = () => (
    <View style={styles.iconContainer}>
      <Icon name="check" size={26} style={styles.icon} />
    </View>
  );
  _onDone = () => this.props.navigation.navigate('Signup');

  render() {
    return (
      <AppIntroSlider
        slides={this.slides}
        onDone={this._onDone}
        renderNextButton={this._renderNextButton}
        renderDoneButton={this._renderDoneButton}
        activeDotStyle={styles.activeDot}
      />
    );
  }
}

const styles = {
  titleStyle: {
    color: '#6b5729',
    fontWeight: '800',
    fontSize: 30,
    textTransform: 'uppercase',
    paddingTop: 25,
  },
  textStyle: {
    color: '#6b5729',
    fontSize: 18,
    fontWeight: '500',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'rgba(255, 255, 255, .9)',
    backgroundColor: 'transparent',
  },
  activeDot: {
    backgroundColor: '#B9994E',
  },
};

export default withTranslation()(Walkthrough);
