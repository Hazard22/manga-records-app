import { TouchableOpacity, StyleSheet, View, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface FloatingButtonProps {
    position: 'bottom-right' | 'top-right'; 
    color: string; 
    icon: 'add' | 'checkmark' | 'home' | 'settings' | 'search' | 'heart'; 
    onPress: (event: GestureResponderEvent) => void; 
}

export default function FloatActionButton({ position, color, icon, onPress }:FloatingButtonProps) {
    const buttonStyle =
    position === 'bottom-right'
      ? styles.bottomRight
      : styles.topRight;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.floatingButton, buttonStyle, { backgroundColor: color }]}
        onPress={onPress}
      >
        <Ionicons name={icon} size={30} color="white" /> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    },
    floatingButton: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Sombra en Android
      shadowColor: '#000', // Sombra en iOS
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    bottomRight: {
      bottom: 20,
      right: 20,
    },
    topRight: {
      top: 20,
      right: 20,
    },
  });
