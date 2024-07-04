import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { COLORS, Hp, FONTS } from '../../constants/theme';
import { getMyMessage, sendMessage } from '../../utils/api';
import { useSelector } from 'react-redux';
import socketServices from '../../utils/sockets/sockertService';
import { getUserDetails } from '../../utils/api/index';

const ChatComponent = ({ item, setUserStatus, setIsTyping, isTyping }) => {
    const userData = useSelector(state => state.user.details);
    const receiverIds = item?.users?.filter(user => user?._id !== userData?._id);

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        MyMessages();
    }, [page]);

    React.useEffect(() => {
        const getUserDetailsFun = () => {
            getUserDetails(receiverIds[0]?._id).then((data) => {
                if (data?.data) {
                    setUserStatus({
                        online: data?.data?.online ? data?.data?.online : false,
                        lastSeen: data?.data?.lastSeen ? data?.data?.lastSeen : null
                    })
                }
            })
        }

        getUserDetailsFun()
    }, []);

    useEffect(() => {
        const handleUserTyping = (userId) => setIsTyping(userId !== userData?._id);
        const handleUserStopTyping = () => setIsTyping(false);
        socketServices.on('user_typing', handleUserTyping);
        socketServices.on('user_stop_typing', handleUserStopTyping);
        socketServices.on("user_online", (data) => {
            if (data?.userid === receiverIds[0]?._id) {
                setUserStatus({
                    online: data?.online,
                    lastSeen: data?.lastSeen ? data?.lastSeen : null
                })
            }
        })
        return () => {
            socketServices.removeListener('user_typing', handleUserTyping);
            socketServices.removeListener('user_stop_typing', handleUserStopTyping);
            socketServices.removeListener("user_online");
        };
    }, [userData?._id]);

    useEffect(() => {
        socketServices.emit('join_room', item?._id);
        socketServices.on('send_message', (data) => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, data));
        });

        return () => {
            socketServices.emit('leave_room', item?._id);
            socketServices.removeListener('send_message');
        };
    }, [item?._id]);

    const MyMessages = async () => {
        try {
            const response = await getMyMessage(`?chatId=${item?._id}&limit=50&page=${page}`);
            setMessages(response?.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const onSend = useCallback(async (messages = []) => {
        const message = messages[0];
        const payload = {
            chatId: item?._id,
            text: message.text,
            receiverId: receiverIds[0]?._id,
        };

        try {
            const response = await sendMessage(payload);
            const newMessage = {
                ...response.data,
                chatId: item?._id,
                userId: receiverIds[0]?._id,
                roomData: response.roomData,
                user: {
                    _id: userData?._id,
                    name: userData?.username,
                },
            };
            socketServices.emit('send_message', newMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, [item, receiverIds, userData]);

    const onInputTextChanged = (text) => {
        if (text.length > 0 && !isTyping) {
            socketServices.emit('is_typing', { chatId: item?._id, userId: userData?._id });
        } else if (text.length === 0) {
            socketServices.emit('stop_typing', { chatId: item?._id, userId: userData?._id });
        }
    };

    const renderBubble = (props) => (
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
                },
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
                },
            }}
            timeTextStyle={{
                left: {
                    color: COLORS.gray,
                    ...FONTS.ftMed,
                },
                right: {
                    color: COLORS.white,
                    ...FONTS.ftMed,
                },
            }}
            tickStyle={{
                left: {
                    color: COLORS.gray,
                    ...FONTS.ftMed,
                },
                right: {
                    color: COLORS.white,
                    ...FONTS.ftMed,
                },
            }}
        />
    );

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
            scrollToBottom
            isTyping={isTyping}
            onInputTextChanged={onInputTextChanged}
            renderAvatar={null}
            keyboardShouldPersistTaps='never'
            placeholder='Type your message...'
            maxInputLength={100}
            onSend={onSend}
            user={{
                _id: userData?._id,
            }}
        />
    );
};

export default ChatComponent;