import { View, Text, StatusBar, TouchableOpacity, FlatList, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, Hp, Wp } from '../../../constants/theme'
import { ElementEqual, SearchNormal } from 'iconsax-react-native'
import FastImage from 'react-native-fast-image'
import DashedLine from '../../../Helper/DashedLine';
import { Check, Checks, Plus } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import InstaStory from 'react-native-insta-story';

const HomeScreen = () => {
    return (
        <SafeAreaView edges={['right', 'top', 'left']} className="flex-1 bg-blue-600">
            <StatusBar barStyle="light-content" backgroundColor="#2563eb" animated={true} />
            <Header />
            <ChatBody />
        </SafeAreaView>
    )
}

const Header = () => {
    return (
        <View className='py-4 pt-2.5 bg-blue-600' style={{ height: Platform.OS === 'ios' ? Hp(26) : Hp(27) }}>
            <View className='flex-row items-center justify-between px-4' >
                <Text className='text-white font-ftMed' style={{ fontSize: Hp(2.6) }}>Hii, <Text className="font-ftBold">Shubuu!</Text></Text>
                <TouchableOpacity className='p-3 bg-white/20 rounded-full'>
                    <ElementEqual size={Hp(3)} className='text-white' variant='TwoTone' />
                </TouchableOpacity>
            </View>
            <View className='px-4' >
                <Text className='text-white font-ftMed' style={{ fontSize: Hp(2) }}>You Recevied</Text>
                <Text className='text-white font-ftSemi underline' style={{ fontSize: Hp(3.2) }}>48 Messages</Text>
            </View>
            <StatusBox />
        </View>
    )
}

const ChatBody = () => {
    return (
        <View className='flex-1 bg-white rounded-t-[28px] pt-3' >
            <FlatList
                ListHeaderComponent={<View className='px-4 pr-4 flex-row items-center' >
                    <Text className='text-black font-ftBold flex-1' style={{ fontSize: Hp(2.8) }}>Chats</Text>
                    <TouchableOpacity className='p-2.5 bg-slate1 rounded-full'>
                        <SearchNormal size={Hp(3.2)} className='text-black' variant='TwoTone' />
                    </TouchableOpacity>
                </View>}
                className="rounded-t-[28px]"
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={({ item }) => <ChatHorizontalCard />}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Hp(4), }}
            />
        </View>

    )
}

const ChatHorizontalCard = () => {
    const navigation = useNavigation()

    // ===================== Render time =================
    const formatTimestamp = t => moment().isSame(t = moment(t), 'day') ? t.format('h:mm A') :
        moment().subtract(1, 'days').isSame(t, 'day') ? 'Yesterday' :
            moment().isSame(t, 'week') ? t.format('dddd') : t.format('DD/MM/YYYY');


    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} activeOpacity={0.8} className='px-3 py-3 space-y-2' >
            <View className='flex-row items-center space-x-2' >
                <View className='relative' >
                    <FastImage source={{ uri: 'https://avatar.iran.liara.run/public' }} style={{ width: Hp(7), height: Hp(7), borderRadius: Wp(50), borderWidth: 2, borderColor: 'white' }} />
                    <View className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white' />
                </View>
                <View className='flex-row items-center pr-9 space-y-1' >
                    <View className='space-y-0.5 flex-1'>
                        <Text numberOfLines={1} className='text-slate-800 font-ftBold' style={{ fontSize: Hp(2.3) }}>Shubham</Text>
                        <Text numberOfLines={1} className='text-slate-500 font-ftMed' style={{ fontSize: Hp(1.8) }}>lorem ipsum dolor jjdal adjj sdaksjd kjaskdj ka ajsd jasdkasjk</Text>
                    </View>
                    <View className='space-y-1.5 pl-2 pr-7'>
                        <Text numberOfLines={1} className='text-slate-500 font-ftMed' style={{ fontSize: Hp(1.6) }}>{formatTimestamp(new Date())}</Text>
                        <View className='self-end' >
                            <Checks size={Hp(2.4)} weight='bold' className='text-blue-600' />
                            {/* <Check size={Hp(2.2)} weight='bold' className='text-400-600' /> */}
                        </View>
                        {/* <View className="bg-red-500 rounded-full justify-center  items-center self-end" style={{ width: Hp(3), height: Hp(3) }}>
                            <Text className="text-white font-ftBold text-center" style={{ fontSize: 3 >= 10 ? Hp(1.3) : Hp(1.6) }} >3</Text>
                        </View> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
        <View className='py-2' >
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