import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import images from '../../constants/images'
import { Hp } from '../../constants/theme';
import ButtonFill from '../../components/Button/ButtonFill'
import ButtonUnfill from '../../components/Button/ButtonUnfill'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WelcomeScreen = ({ navigation }) => {

    // ===================== Handle Check Login =================
    const handleCheckLogin = async (type) => {
        const welcome = await AsyncStorage.getItem('@onBoarding');
        if (welcome) {
            type == 'Login' ? navigation.replace('Login') : navigation.replace('Register')
        } else {
            await AsyncStorage.setItem('@onBoarding', 'onBoardingLoginFirstTime');
            type == 'Login' ? navigation.replace('Login') : navigation.replace('Register')
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar backgroundColor="#fff" barStyle='dark-content' />
            <View className='flex-1 justify-end space-y-8' >
                <FastImage source={images.Welcome} style={{ width: "100%", height: Hp(30) }} resizeMode='cover' />
                <View className='px-4 space-y-3' >
                    <Text className='font-ftBold text-black' style={{ fontSize: Hp(3.6) }}>Welcome to <Text className="text-blue-600 font-ftDark">"Chat Point"</Text></Text>
                    <Text className='font-ftMed text-slate-500' style={{ fontSize: Hp(2) }}>Chat Point is a user-friendly messaging app for secure text, voice, and multimedia communication.</Text>
                    <View className='space-y-3 py-4 mb-5' >
                        <View>
                            <ButtonFill onPress={() => handleCheckLogin('Login')} title="Login" iosStyle={true} upparcase={true} />
                        </View>
                        <View>
                            <ButtonUnfill onPress={() => handleCheckLogin('Register')} title="Register" iosStyle={true} upparcase={true} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen