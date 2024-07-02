import { View, StatusBar, Image } from 'react-native';
import React from 'react';
import images from '../../constants/images';
import { Hp } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SplashScreen({ navigation }) {

    // ===================== Login In Check =================
    const loginInCheck = async () => {
        const token = await AsyncStorage.getItem('@token');
        const onBoarding = await AsyncStorage.getItem('@onBoarding');
        if (token) {
            navigation.replace('Home')
        } else if (onBoarding) {
            navigation.replace('Login')
        } else {
            navigation.replace('Welcome')
        }
    }

    React.useEffect(() => {
        setTimeout(() => {
            loginInCheck()
        }, 500);
    }, [])

    return (
        <View className="bg-white flex-1 justify-center items-center ">
            <StatusBar backgroundColor="#fff" barStyle='dark-content' />
            <View className='flex-row items-center space-x-3' >
                <Image source={images.LogoGif} style={{ width: Hp(38), height: Hp(38) }} resizeMode='contain' />
                {/* <Text className='text-black font-ftBold' style={{ fontSize: Hp(5.5) }}>Chat Point</Text> */}
            </View>
        </View>
    )
}