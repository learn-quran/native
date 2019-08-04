// @flow
import React from 'react';
import { View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import { withTranslation } from 'react-i18next';

const { height, width } = Dimensions.get('screen');
const ratio = height / width;

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
    const lang = t('lang-code');
    this.slides = [
      {
        key: 'index',
        text: `${t('learn-quran')} ${t(
          'is-a-hybrid-platform-for-testing-your-knowledge-in-the-holy-quran',
        )}`,
        textStyle: {
          color: '#B9994E',
          fontSize: Math.round(16 * ratio),
          fontFamily: `${fontFamily}-Bold`,
        },
        image: require('../Assets/Images').logo,
        imageStyle: {
          width: width * 0.7,
          height: width * 0.7,
        },
        backgroundColor: '#f4f0eb',
      },
      {
        key: 'how-to-play',
        title: t('how-to-play'),
        titleStyle: styles.titleStyle(fontFamily),
        text: t('walkthrough-how-to-play-paragprah'),
        textStyle: styles.textStyle(lang),
        image: require('../Animations').howToPlay,
        imageStyle: {
          width: width * 0.7,
          height: height * 0.4,
        },
        backgroundColor: '#f4f0eb',
      },
      {
        key: 'inspiration',
        title: t('inspiration'),
        titleStyle: styles.titleStyle(fontFamily),
        text: t('walkthrough-inspiration-paragprah'),
        textStyle: {
          ...styles.textStyle(lang),
          fontSize: Math.round(9.5 * ratio),
        },
        image: require('../Animations').inspiration,
        imageStyle: {
          width: width * 0.7,
          height: height * 0.3,
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
  titleStyle: fontFamily => ({
    color: '#6b5729',
    fontFamily: `${fontFamily}-Bold`,
    fontSize: 30,
    textTransform: 'uppercase',
    paddingTop: 25,
    height: height * 0.2,
  }),
  textStyle: lang => ({
    color: '#6b5729',
    fontFamily: lang === 'en' ? 'Rajdhani-Medium' : 'Amiri-Regular',
    fontSize: Math.round(10 * ratio),
    height: height * 0.24,
  }),
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
