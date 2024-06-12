import { View, Text, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ArrowLeft, CallBell, CaretLeft, DotOutline, DotsThreeOutlineVertical } from 'phosphor-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, Hp } from '../../../constants/theme';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useCallback, useEffect, useState } from 'react';
import ChatComponent from '../../../components/ChatCom/ChatComponent';
import FastImage from 'react-native-fast-image';

const ChatScreen = () => {
    return (
        <SafeAreaView edges={['right', 'top', 'left']} className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#fff" animated={true} />
            <Header />
            <ChatComponent />
        </SafeAreaView>
    )
}


const Header = ({ name }) => {
    const navigation = useNavigation()
    return (
        <View className="flex-row  z-20  px-3 py-1.5 items-center  bg-white w-full " style={{ shadowColor: '#bbb', shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 5 : 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 10 }}>
            <TouchableOpacity activeOpacity={.7} className=" p-1.5" onPress={() => navigation.goBack()}>
                <CaretLeft weight='bold' className="text-black" size={Hp(3.2)} />
            </TouchableOpacity>
            <View className='flex-row items-center flex-1 space-x-2' >
                <FastImage source={{ uri: 'https://avatar.iran.liara.run/public' }} style={{ width: Hp(5.5), height: Hp(5.5), borderRadius: Hp(5.5) }} className="rounded-full bg-slate-200" />
                <View className='flex-1' >
                    <Text numberOfLines={1} className='text-black font-ftBold' style={{ fontSize: Hp(2.1) }}>Shubham Singh</Text>
                    <View className='flex-row items-center space-x-1' >
                        <View className='w-2 h-2 bg-green-500 rounded-full' />
                        <Text numberOfLines={1} className='text-slate-400 font-ftSemi' style={{ fontSize: Hp(1.6) }}>Online</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity={.8} className="" >
                <DotsThreeOutlineVertical weight='fill' className="text-black" size={Hp(3)} />
            </TouchableOpacity>
        </View>
    )
}



export default ChatScreen