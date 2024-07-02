import { View, Text, StatusBar, TouchableOpacity, FlatList, Platform, TextInput, Keyboard, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, Hp } from '../../../constants/theme'
import _ from "lodash";
import { BoxSearch, CloseCircle, SearchNormal } from 'iconsax-react-native';
import { useIsFocused } from '@react-navigation/native'
import { ArrowLeft, Plus } from 'phosphor-react-native';
import ContactCard from '../../../components/ChatCom/ContactCard';
import Contacts from 'react-native-contacts';


const ContactList = ({ navigation }) => {
    return (
        <SafeAreaView edges={['right', 'top', 'left']} className="flex-1 bg-blue-600">
            <StatusBar barStyle="light-content" backgroundColor="#2563eb" animated={true} />
            <View className='py-4 pt-2.5 bg-blue-600' style={{ height: Platform.OS === 'ios' ? Hp(16) : Hp(10) }}>
                <TouchableOpacity activeOpacity={.7} className="bg-slate1 rounded-full p-3.5 self-baseline mx-3" onPress={() => navigation.goBack()}>
                    <ArrowLeft weight='bold' className="text-blue-600" size={Hp(3)} />
                </TouchableOpacity>
                <View className='p-4' >
                    <Text className='text-white font-ftBold' style={{ fontSize: Hp(3.5) }}>Contact List</Text>
                </View>
            </View>
            <ContactListBody />
            {/* <TouchableOpacity activeOpacity={.7} className="bg-blue-600 rounded-full p-3.5 self-baseline mx-3 absolute right-5" onPress={() => navigation.goBack()} style={{ bottom: Platform.OS === 'ios' ? Hp(8) : Hp(5), shadowColor: '#aaa', shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 5 : 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 }}>
                <Plus weight='bold' className="text-white" size={Hp(3.5)} />
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

const ContactListBody = () => {

    const isFocused = useIsFocused();
    const inputRef = React.useRef(null)
    const [querySet, setQuerySet] = React.useState("");
    const [loader, setloader] = React.useState(false);

    const handleSearch = (data) => {
        debounce(data);
    };
    const debounce = React.useCallback(
        _.debounce((_searchVal) => {
            Search(_searchVal);
        }, 1000),
        []
    );

    const Search = (query) => {
        setloader(true)
        setQuerySet(query)
        if (query?.length > 0) {
            Keyboard.dismiss()
            try {
                setloader(false)
            } catch (error) {
                setloader(false)
                console.log("🚀 ~ Search ~ error:", error)
            }
        } else {
            setQuerySet("")
            setloader(false)
        }
    }
    const clearTextInput = () => {
        if (inputRef.current) {
            setQuerySet("")
            Keyboard.dismiss()
            inputRef.current.clear();
        }
    };


    React.useEffect(() => {
        clearTextInput()
        setQuerySet("")
    }, [isFocused]);

    let [contacts, setContacts] = useState([]);

    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
            }).then(() => {
                loadContacts();
            }
            );
        } else {
            loadContacts();
        }
    }, []);

    const loadContacts = () => {
        Contacts.getAll()
            .then(contacts => {
                contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
                setContacts(contacts);
            })
            .catch(e => {
                alert('Permission to access contacts was denied');
                console.warn('Permission to access contacts was denied');
            });
    };


    return (
        <View className='flex-1 bg-white rounded-t-[28px] pt-3' >
            <FlatList
                ListHeaderComponent={
                    <View className=" pt-2 pb-2  px-3">
                        <View className='bg-slate1 rounded-full flex-row items-center px-3 py-0.5 ios:py-4 ' >
                            <SearchNormal size={Hp(3)} className="text-blue-500" variant="TwoTone" />
                            <TextInput
                                ref={inputRef}
                                className="text-black  flex-1 font-ftMed pl-1.5"
                                placeholder="Search For Your Location..."
                                autoCapitalize="none"
                                autoComplete='off'
                                autoCorrect={false}
                                style={{ fontSize: Hp(2) }}
                                contentStyle={{ letterSpacing: 0 }}
                                cursorColor={COLORS.primary}
                                keyboardType='default'
                                placeholderTextColor="#64748B"
                                returnKeyType='search'
                                onChangeText={handleSearch}
                            />
                            {querySet.length > 0 && <TouchableOpacity onPress={() => { inputRef.current.clear() }} activeOpacity={.8} >
                                <CloseCircle variant='Bold' size={Hp(3)} className="text-slate-300" />
                            </TouchableOpacity>}
                        </View>
                    </View>}
                className="rounded-t-[28px]"
                data={contacts}
                renderItem={({ item }) => <ContactCard contact={item} Contacts={Contacts} />}
                keyExtractor={item => item.recordID}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Hp(4), }}
            />
        </View>
    )
}

export default ContactList