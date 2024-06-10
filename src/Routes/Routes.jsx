import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Main/HomeStack/HomeScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import SplachScreen from '../screens/Auth/SplachScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';

const Routes = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                animationDuration: 300,
                animationTypeForReplace: 'push',
                animationEnabled: true,
            }}>

                {/* ==================== AUTH STACK ================== */}
                <Stack.Screen name="Splach" component={SplachScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />

                {/* ==================== MAIN STACK ================== */}
                <Stack.Screen name="Home" component={HomeScreen} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes