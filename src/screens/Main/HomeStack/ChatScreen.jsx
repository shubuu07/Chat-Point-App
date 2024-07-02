import { View, Text, TouchableOpacity, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { CaretLeft, DotsThreeOutlineVertical } from 'phosphor-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Hp } from '../../../constants/theme';
import ChatComponent from '../../../components/ChatCom/ChatComponent';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import moment from 'moment';

const ChatScreen = (props) => {
    const user = props.route.params
    const [userStatus, setUserStatus] = React.useState({
        online: false,
        lastSeen: null
    });
    const [isTyping, setIsTyping] = useState(false);


    return (
        <SafeAreaView edges={['right', 'top', 'left']} className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#fff" animated={true} />
            <Header user={user} userStatus={userStatus} isTyping={isTyping} />
            <ChatComponent item={user} setUserStatus={setUserStatus} setIsTyping={setIsTyping} isTyping={isTyping} />
            {Platform.OS === "android" && (
                <KeyboardAvoidingView keyboardVerticalOffset={80} behavior='padding' />
            )}
        </SafeAreaView>
    )
}


const Header = ({ user, userStatus, isTyping }) => {
    const userDetails = useSelector(state => state.user.details)
    const navigation = useNavigation()
    const item = user.users.filter(item => item._id !== userDetails._id)
    return (
        <View className="flex-row  z-20  px-3 py-1.5 items-center  bg-white w-full " style={{ shadowColor: '#bbb', shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 5 : 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 10 }}>
            <TouchableOpacity activeOpacity={.7} className=" p-1.5" onPress={() => navigation.goBack()}>
                <CaretLeft weight='bold' className="text-black" size={Hp(3.2)} />
            </TouchableOpacity>
            <View className='flex-row items-center flex-1 space-x-2' >
                <FastImage source={{ uri: item[0]?.profile ? item[0]?.profile : 'https://avatar.iran.liara.run/public' }} style={{ width: Hp(5.5), height: Hp(5.5), borderRadius: Hp(5.5) }} className="rounded-full bg-slate-200" />
                <View className='flex-1' >
                    <Text numberOfLines={1} className='text-black font-ftBold' style={{ fontSize: Hp(2.1) }}>{item[0]?.username ? item[0]?.username : '-------'}</Text>
                    <View className='flex-row items-center space-x-1' >
                        {isTyping || userStatus?.online && <View className='w-2 h-2 bg-green-500 rounded-full' />}
                        <Text numberOfLines={1} className='text-slate-400 font-ftSemi' style={{ fontSize: Hp(1.6) }}>
                            {isTyping ? 'typing...' : userStatus?.online ? 'Online' : `Last seen: ${moment(userStatus?.lastSeen).calendar()}`}
                        </Text>
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