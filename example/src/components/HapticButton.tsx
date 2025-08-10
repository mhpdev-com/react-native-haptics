import React from 'react';
import {
  Text,
  useColorScheme,
  TouchableOpacity,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
} from 'react-native';
import {getRandomColor} from '../core/config';

interface HapticButtonProps extends TouchableOpacityProps {
  title: string;
}

const HapticButton: React.FC<HapticButtonProps> = ({style, title, ...rest}) => {
  const scheme = useColorScheme();

  const textStyle = React.useMemo<TextStyle>(() => {
    return {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      color: scheme === 'dark' ? 'white' : 'black',
    };
  }, [scheme]);

  const buttonStyle = React.useMemo<ViewStyle>(() => {
    return {
      padding: 10,
      borderRadius: 7.5,
      marginVertical: 10,
      backgroundColor: getRandomColor(),
    };
  }, []);

  return (
    <TouchableOpacity style={[buttonStyle, style]} {...rest}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HapticButton;
