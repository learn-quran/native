import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

type Props = {
  inheritedValue: string,
  label: string,
  helperText: string,
  onSubmit: Function,
  buttonText: string,
  isSubmitting: boolean,
  inputProps: Object,
  lang: 'en' | 'ar',
};
const InputCard = ({
  inheritedValue,
  label,
  helperText,
  onSubmit,
  buttonText,
  isSubmitting,
  lang,
  ...rest
}: Props) => {
  const [value, setValue] = useState(inheritedValue || '');
  const handleChange = val => setValue(val);
  const handleSubmit = () => onSubmit(value);
  const isLabel = Platform.OS === 'android' && lang === 'en';
  return (
    <View style={styles.container}>
      {!!helperText && (
        <View style={styles.helperTextContainer}>
          <Text style={styles.helperText}>{helperText}</Text>
        </View>
      )}
      <TextInput
        label={isLabel ? label : ''}
        placeholder={!isLabel ? label : ''}
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        mode="flat"
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        {...rest}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={isSubmitting}
        loading={isSubmitting}>
        {buttonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#ccc',
    borderWidth: 0.1,
    borderRadius: 8,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  helperTextContainer: {
    width: '88%',
    marginTop: 20,
  },
  helperText: {
    fontSize: 18.5,
    color: 'black',
  },
  input: {
    width: '85%',
    marginVertical: 20,
  },
  button: {
    paddingVertical: 10,
    marginTop: 8,
    marginBottom: 15,
  },
});

export default InputCard;
