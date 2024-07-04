import { View, Text, StatusBar, TouchableOpacity, FlatList, Platform, Alert, TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, Hp, FONTS, Wp } from '../../../constants/theme';
import { Edit, ElementEqual, SearchNormal, SearchStatus } from 'iconsax-react-native'
import { DotsThreeOutlineVertical, Plus, Power } from 'phosphor-react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import InstaStory from 'react-native-insta-story';
import ChatHorizontalCard from '../../../components/ChatCom/ChatHorizontalCard';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useRef } from 'react';
import { myChats } from '../../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserDetails } from '../../../Redux/slice/userSlice';
import EmptyList from '../../../components/ErrorComponent/EmptyList';
import socketServices from '../../../utils/sockets/sockertService';
import {
    Menu,
    MenuItem,
    MenuDivider,
    Position,
} from 'react-native-enhanced-popup-menu';

const HomeScreen = () => {
    const user = useSelector(state => state.user.details)
    React.useEffect(() => {
        socketServices.initialzeSocekt(user._id)
    }, []);
    return (
        <SafeAreaView edges={['right', 'top', 'left']} className="flex-1 bg-blue-600">
            <StatusBar barStyle="light-content" backgroundColor="#2563eb" animated={true} />
            <Header />
            <ChatBody />
        </SafeAreaView>
    )
}

const Header = () => {
    const navigation = useNavigation()
    const user = useSelector(state => state.user.details)
    const dispatch = useDispatch();

    const onLogout = async () => {
        dispatch(setUserDetails({}));
        await AsyncStorage.removeItem('@token');
        if (Platform.OS === "android") {
            navigation.replace('Login');
        } else {
            navigation.navigate('Login');
        }
    }

    const elementRef = useRef(null);
    let menuRef = null;

    const setMenuRef = (ref) => (menuRef = ref);
    const hideMenu = () => menuRef?.hide();
    const showMenu = () => {
        menuRef?.show(elementRef.current, Position.TOP_RIGHT);
    };

    const onPress = () => showMenu();

    return (
        <View className='py-4 pt-5 bg-blue-600 space-y-5' style={{ height: Platform.OS === 'ios' ? Hp(22) : Hp(27) }}>
            <View className='flex-row items-center justify-between px-4' >
                <Text className='text-white font-ftBold capitalize' style={{ fontSize: Hp(3.2) }}>Hi, {user.username}👋🏻</Text>
                <View >
                    <TouchableOpacity activeOpacity={.8} onPress={onPress} >
                        <DotsThreeOutlineVertical size={Hp(3)} color='white' weight='fill' />
                    </TouchableOpacity>
                    <View className="absolute top-2 right-1" ref={elementRef} >
                    </View>
                </View>
            </View>
            <Menu ref={setMenuRef} style={{ backgroundColor: 'white', width: Wp(45), height: Hp(25), borderRadius: Hp(1.5) }}>
                <MenuItem onPress={hideMenu} textStyle={{ color: 'black', ...FONTS.ftSemi, fontSize: Hp(2) }} style={{ marginVertical: Hp(0.2) }}>New Group</MenuItem>
                <MenuItem onPress={hideMenu} textStyle={{ color: 'black', ...FONTS.ftSemi, fontSize: Hp(2) }} style={{ marginVertical: Hp(0.2) }}>Dark Mode</MenuItem>
                <MenuItem onPress={hideMenu} textStyle={{ color: 'black', ...FONTS.ftSemi, fontSize: Hp(2) }} style={{ marginVertical: Hp(0.2) }}>
                    Invite Friend
                </MenuItem>
                <MenuItem onPress={hideMenu} textStyle={{ color: 'black', ...FONTS.ftSemi, fontSize: Hp(2) }} style={{ marginVertical: Hp(0.2) }}>Setting</MenuItem>
            </Menu>
            <StatusBox />
        </View>
    )
}

const ChatBody = () => {
    const userData = useSelector(state => state.user.details)
    const [chatList, setChatList] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const isFocus = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        getAllChats();
    }, [isFocus]);
    const getAllChats = () => {
        setLoader(true);
        myChats().then((res) => {
            console.log("🚀 ~ file: HomeScreen.jsx:149 ~ .then ~ res:", res)
            setLoader(false);
            setChatList(res?.data)
        })
            .catch((error) => {
                setLoader(false);
                console.log(error);
            });
    };


    useFocusEffect(
        React.useCallback(() => {

            setTimeout(() => {
                socketServices.emit("join_chat", userData?._id)

                socketServices.on("new_chat", (value) => {
                    console.log("🚀 ~ file: HomeScreen.jsx:119 ~ socketServices.on ~ value:", value)
                    setChatList(prev => {
                        const updatedList = prev.filter(item => item?._id !== value?._id);
                        return [value, ...updatedList];
                    });
                })

                return () => {
                    socketServices.emit('leave_chat', userData?._id)
                    socketServices.removeListener("new_chat")
                }
            }, 100);
        }, [])
    );

    useEffect(() => {
        const handleUserTyping = (userId) => setIsTyping(userId !== userData?._id);
        const handleUserStopTyping = () => setIsTyping(false);
        socketServices.on('user_typing', handleUserTyping);
        socketServices.on('user_stop_typing', handleUserStopTyping);
        return () => {
            socketServices.removeListener('user_typing', handleUserTyping);
            socketServices.removeListener('user_stop_typing', handleUserStopTyping);
        };
    }, [userData?._id]);


    return (
        <View className='flex-1 bg-white rounded-t-[28px] pt-4' >
            {
                chatList?.length == 0 ? <EmptyList text={"No chat history available"} text2={"Create your first conversation today and connect with others!"} /> : <FlatList
                    ListHeaderComponent={<View className="px-2.5">
                        <View className='bg-slate1 rounded-full flex-row items-center px-3 py-0.5 ios:py-4 space-x-2.5' >
                            <SearchStatus size={Hp(3)} className="text-black" variant="TwoTone" />
                            <TextInput
                                // ref={inputRef}
                                className="text-black  flex-1 font-intSemi"
                                placeholder="Search Location..."
                                autoCapitalize="none"
                                autoComplete='off'
                                autoCorrect={false}
                                style={{ fontSize: Hp(2) }}
                                contentStyle={{ letterSpacing: 0 }}
                                cursorColor={COLORS.primary}
                                keyboardType='default'
                                placeholderTextColor="#64748B"
                                returnKeyType='search'
                            // onChangeText={handleSearch}
                            />
                            {/* {querySet?.length > 0 && <TouchableOpacity onPress={() => { setLoaction([]), inputRef.current.clear(), setQuerySet("") }} activeOpacity={.8} >
                            <CloseCircle variant='Bold' size={Hp(3.5)} className="text-slate-300" />
                        </TouchableOpacity>} */}
                        </View>
                    </View>}
                    className="rounded-t-[28px]"
                    data={chatList}
                    renderItem={({ item }) => <ChatHorizontalCard item={item} />}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Hp(4), }}
                />
            }
            <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Add_Chat')} className='absolute bottom-16 right-6 bg-blue-500 p-3 rounded-full' style={{ shadowColor: '#aaa', shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 5 : 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 }} >
                <Plus size={Hp(4.5)} className="text-white" weight='bold' />
            </TouchableOpacity>

        </View>

    )
}

const StatusBox = () => {
    const data = [
        {
            user_id: 1,
            user_image:
                'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
            user_name: 'Ahmet Çağlar Durmuş',
            stories: [
                {
                    story_id: 1,
                    story_image:
                        'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image:
                        'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
                },
            ],
        },
        {
            user_id: 2,
            user_image:
                'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
            user_name: 'Test User',
            stories: [
                {
                    story_id: 1,
                    story_image:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image:
                        'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
                    swipeText: 'Custom swipe text for this story',
                    onPress: () => console.log('story 2 swiped'),
                },
            ],
        },
    ];
    return (
        <View className='py-3 px-1' >
            <InstaStory
                avatarFlatListProps={{
                    ListHeaderComponent:
                        <View className="space-y-[3px] mr-3">
                            <TouchableOpacity activeOpacity={0.8} className='rounded-full bg-white/40 mt-2  justify-center items-center' style={{ width: Hp(7.6), height: Hp(7.6) }}>
                                <Plus size={Hp(3.5)} weight='bold' color={COLORS.white} />
                            </TouchableOpacity>
                            <Text className='text-white font-ftSemi text-center' style={{ fontSize: Hp(1.6) }}>Add Story</Text>
                        </View>
                }}
                data={data}
                duration={10}
                onStoryPress={(story) => console.log('story pressed:', story)}
                onStoryLongPress={(story) => console.log('story long pressed:', story)}
                onUserPress={(user) => console.log('user pressed:', user)}
                onUserLongPress={(user) => console.log('user long pressed:', user)}
                unPressedBorderColor={'#fff'}
                pressedBorderColor={'#94a3b8'}
                unPressedAvatarTextColor={'#fff'}
                pressedAvatarTextColor={'#fff'}
                avatarSize={Hp(7.5)}
                avatarTextStyle={{ fontSize: Hp(1.6), fontFamily: 'Figtree-SemiBold' }}
                loadedAnimationBarStyle={{ backgroundColor: "#38bdf8", height: Hp(0.3), borderRadius: Hp(5) }}
                unloadedAnimationBarStyle={{ backgroundColor: "#fff", height: Hp(0.3), borderRadius: Hp(5) }}
                storyAvatarImageStyle={{ borderRadius: Hp(3.5), width: Hp(6), height: Hp(6) }}
                storyUserContainerStyle={{ marginTop: Hp(1.5) }}
            />
        </View>
    )
}
export default HomeScreen