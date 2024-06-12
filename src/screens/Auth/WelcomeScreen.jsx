import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import images from '../../constants/images'
import { Hp, Wp } from '../../constants/theme';
import ButtonFill from '../../components/Button/ButtonFill'
import ButtonUnfill from '../../components/Button/ButtonUnfill'

const WelcomeScreen = ({ navigation }) => {
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
                            <ButtonFill onPress={() => navigation.navigate('Login')} title="Login" iosStyle={true} upparcase={true} />
                        </View>
                        <View>
                            <ButtonUnfill onPress={() => navigation.navigate('Register')} title="Register" iosStyle={true} upparcase={true} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen