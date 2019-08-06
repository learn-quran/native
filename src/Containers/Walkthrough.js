// @flow
import React from 'react';
import { View, Image, Dimensions, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import { withTranslation } from 'react-i18next';

const { height, width } = Dimensions.get('screen');
const ratio = Platform.select({
  ios: height / width + 0.2,
  android: height / width + 0.1,
});

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
        title: `${t('learn-quran')} ${t(
          'is-a-hybrid-platform-for-testing-your-knowledge-in-the-holy-quran',
        )}`,
        titleStyle: {
          color: '#B9994E',
          fontSize: Math.round(10 * ratio),
          fontFamily: `${fontFamily}-Bold`,
        },
        image: require('../Assets/Images').logo,
        imageStyle: {
          width: width * 0.7,
          height: width * 0.7,
        },
      },
      {
        key: 'how-to-play',
        title: t('how-to-play'),
        text: t('walkthrough-how-to-play-paragprah'),
        image: require('../Animations').howToPlay,
        lang,
      },
      {
        key: 'inspiration',
        title: t('inspiration'),
        text: t('walkthrough-inspiration-paragprah'),
        textStyle: {
          fontSize: Math.round(8.5 * ratio),
        },
        image: require('../Animations').inspiration,
        lang,
      },
    ];
  }

  _renderItem = ({ item, dimensions }) => (
    <View style={[styles.container, dimensions]} key={item.key}>
      <View style={styles.image.container}>
        <Image
          source={item.image}
          style={[styles.image.image, item.imageStyle]}
        />
      </View>
      <View style={styles.title.container}>
        <Text style={[styles.title.text, item.titleStyle]}>{item.title}</Text>
      </View>
      {!!item.text && (
        <View style={styles.desc.container}>
          <Text style={styles.desc.text(item.lang)}>{item.text}</Text>
        </View>
      )}
    </View>
  );
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
        renderItem={this._renderItem}
        onDone={this._onDone}
        renderNextButton={this._renderNextButton}
        renderDoneButton={this._renderDoneButton}
        activeDotStyle={styles.activeDot}
      />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f4f0eb',
    paddingTop: 35,
    paddingBottom: height * 0.08 + 30,
  },
  image: {
    container: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: width * 0.7,
      height: '120%',
    },
  },
  title: {
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 4,
    },
    text: {
      color: '#6b5729',
      fontWeight: '700',
      fontSize: 30,
      textTransform: 'uppercase',
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
  },
  desc: {
    container: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 4,
    },
    text: lang => ({
      color: '#6b5729',
      textAlign: 'center',
      fontSize: Math.round(9 * ratio),
      backgroundColor: 'transparent',
      fontFamily: lang === 'en' ? 'Rajdhani-Medium' : 'Amiri-Regular',
    }),
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
