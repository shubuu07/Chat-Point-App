import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import { Hp, Wp } from '../../constants/theme'
import { Checks } from 'phosphor-react-native'

const ContactCard = ({ contact, Contacts }) => {
    const navigation = useNavigation()

    const openContact = (contact) => {
        console.log(JSON.stringify(contact));
        Contacts.openExistingContact(contact);
    };

    return (
        <TouchableOpacity onPress={() => openContact(contact)} activeOpacity={0.8} className='px-3 py-3 space-y-2' >
            <View className='flex-row items-center space-x-2' >
                <View className='relative' >
                    <FastImage source={{ uri: contact.thumbnailPath ? contact.thumbnailPath : 'https://avatar.iran.liara.run/public' }} style={{ width: Hp(7), height: Hp(7), borderRadius: Wp(50), borderWidth: 2, borderColor: 'white' }} className="bg-blue-100" />
                    <View className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white' />
                </View>
                <View className='flex-row items-center pr-9 space-y-1' >
                    <View className='space-y-0.5 flex-1 pr-6'>
                        <Text numberOfLines={1} className='text-slate-800 font-ftBold' style={{ fontSize: Hp(2.3) }}>{contact?.givenName}</Text>
                        <Text numberOfLines={1} className='text-slate-500 font-ftMed' style={{ fontSize: Hp(1.8) }}>{contact?.phoneNumbers[0]?.number}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ContactCard