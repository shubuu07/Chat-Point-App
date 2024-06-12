import { View, Text, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat'
import { COLORS, Hp, FONTS } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatComponent = () => {
    const { width, height } = Dimensions.get('window');
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer I am Shubham  ajdsja jd klajskld jkajd kljakl ',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://avatar.iran.liara.run/public',
                },
            },
            {
                _id: 2,
                text: 'Hello developer I am Shubham jajdja djj dklajkjdk jkk klaja kljkalj klajdkl',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://avatar.iran.liara.run/public',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const renderBubble = props => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#fff',
                        borderBottomStartRadius: 3,
                        paddingVertical: Hp(0.5),
                    },
                    right: {
                        backgroundColor: COLORS.primary,
                        borderBottomEndRadius: 3,
                        paddingVertical: Hp(0.5),
                    }
                }}
                textStyle={{
                    left: {
                        color: COLORS.black,
                        fontSize: Hp(2.1),
                        ...FONTS.ftMed,
                    },
                    right: {
                        color: COLORS.white,
                        fontSize: Hp(2.1),
                        ...FONTS.ftMed,
                    }
                }}
                timeTextStyle={{
                    left: {
                        color: COLORS.gray,
                        ...FONTS.ftMed,
                    },
                    right: {
                        color: COLORS.white,
                        ...FONTS.ftMed,
                    }
                }}
            />
        )
    }
    return (
        <GiftedChat
            messagesContainerStyle={{
                backgroundColor: COLORS.slateGray,
            }}
            listViewProps={{
                showsVerticalScrollIndicator: false,
                keyboardShouldPersistTaps: 'never',
            }}
            renderBubble={renderBubble}
            messages={messages}
            scrollToBottom={true}
            // isTyping={true}
            renderFooter={() => <View style={{ height: Hp(2) }} />}
            keyboardShouldPersistTaps='never'
            alwaysShowSend={true}
            placeholder='Type your message...'
            maxInputLength={100}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default ChatComponent