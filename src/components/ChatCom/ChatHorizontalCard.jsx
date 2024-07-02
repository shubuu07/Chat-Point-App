import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import { Hp, Wp } from '../../constants/theme'
import { Check, Checks } from 'phosphor-react-native'
import { useSelector } from 'react-redux'
import socketServices from '../../utils/sockets/sockertService'

const ChatHorizontalCard = ({ item }) => {
    const navigation = useNavigation()
    const userDetails = useSelector(state => state.user.details)

    const user = item?.users?.filter(item => {
        return item._id !== userDetails?._id
    })

    // ===================== Render time =================
    const formatTimestamp = t => moment().isSame(t = moment(t), 'day') ? t.format('h:mm A') :
        moment().subtract(1, 'days').isSame(t, 'day') ? 'Yesterday' :
            moment().isSame(t, 'week') ? t.format('dddd') : t.format('DD/MM/YYYY');


    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', { ...item })} activeOpacity={0.8} className='p-3.5 space-y-2 ' >
            <View className='flex-row items-center space-x-2' >
                <View className='relative' >
                    <FastImage source={{ uri: user[0]?.profile ? user[0]?.profile : 'https://avatar.iran.liara.run/public' }} style={{ width: Hp(7.5), height: Hp(7.5), borderRadius: Wp(50), borderWidth: 2, borderColor: 'white' }} />
                    {/* {userStatus?.online && <View className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white' />} */}
                </View>
                <View className='flex-row items-center pr-9 space-y-1' >
                    <View className='space-y-0.5 flex-1'>
                        <Text numberOfLines={1} className='text-slate-800 font-ftBold' style={{ fontSize: Hp(2.3) }}>{user[0]?.username ? user[0]?.username : '-------'}</Text>
                        <Text numberOfLines={1} className='text-slate-500 font-ftMed' style={{ fontSize: Hp(1.8) }}>{item?.latestMsg ? item?.latestMsg : user[0]?.phoneNo}</Text>
                    </View>
                    <View className='space-y-1.5 pl-2 pr-7'>
                        {item?.latestMsg ? <Text numberOfLines={1} className='text-slate-500 font-ftMed' style={{ fontSize: Hp(1.6) }}>{formatTimestamp(item?.updatedAt)}</Text> : <Text numberOfLines={1} className='text-white font-ftMed' style={{ fontSize: Hp(1.6) }}>{formatTimestamp(item?.updatedAt)}</Text>}
                        {item?.receiver == userDetails?._id && <View className='self-end' >
                            <Checks size={Hp(2.4)} weight='bold' className='text-blue-600' />

                            {/* <Check size={Hp(2.2)} weight='bold' className='text-slate-400' /> */}
                        </View>}
                        {item?.receiver !== userDetails?._id && <View className="bg-red-500 rounded-full justify-center  items-center self-end" style={{ width: Hp(3), height: Hp(3) }}>
                            <Text className="text-white font-ftBold text-center" style={{ fontSize: 3 >= 10 ? Hp(1.3) : Hp(1.6) }} >1</Text>
                        </View>}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatHorizontalCard