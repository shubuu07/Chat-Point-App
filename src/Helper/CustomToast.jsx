import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import icons from '../constants/icons';
import { Hp } from '../constants/theme'

function CustomToast({ message, type }) {
    return (
        <View className={`${type === 'success' ? 'py-3 space-x-1' : type === 'error' ? 'py-3 space-x-1' : type === 'warning' ? 'py-3 space-x-1.5' : 'py-2.5'} flex-row items-center justify-center px-3 
         bg-white  rounded-[30px] `} style={{ shadowColor: '#888', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 10 }}>
            {type && <LottieView
                loop
                autoPlay
                style={type === 'success' ? { width: Hp(3), height: Hp(3) } : type === 'error' ? { width: Hp(3.5), height: Hp(3.5) } : type === 'warning' ? { width: Hp(3.5), height: Hp(3.5) } : ''}
                source={type === 'success' ? icons.success : type === 'error' ? icons.error : type === 'warning' ? icons.warning : ''}
            />}
            <Text className='text-slate-600 font-intMed' style={{ fontSize: Hp(2) }}>{message}</Text>
        </View>
    );
}

export default CustomToast