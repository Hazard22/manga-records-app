import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  return (
    <PaperProvider theme={paperTheme}>
        <Stack
        screenOptions={{
          headerShown: false
        }}
        >
          <Stack.Screen name="(home)" />
        </Stack>
    </PaperProvider>
  );
}
