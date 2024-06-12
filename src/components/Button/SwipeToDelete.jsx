import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { COLORS, Hp } from '../../constants/theme';
import { NotificationBing, Trash } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const LIST_ITEM_HEIGHT = 80;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const SwipeToDelete = ({ item, onDismiss, simultaneousHandlers, }) => {
    const navigation = useNavigation()
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const opacity = useSharedValue(1);

    // ===================== Pan Gesture =================

    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished && onDismiss) {
                        runOnJS(onDismiss)(item);
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        },
    });

    // ===================== Styles =================
    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    // ===================== Animations =================
    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
            translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
        );
        return { opacity };
    });

    // ===================== Render =================
    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            opacity: opacity.value,
        };
    });

    // ===================== Render time =================
    const formatTimestamp = t => moment().isSame(t = moment(t), 'day') ? t.format('h:mm A') :
        moment().subtract(1, 'days').isSame(t, 'day') ? 'Yesterday' :
            moment().isSame(t, 'week') ? t.format('dddd') : t.format('DD/MM/YYYY');


    return (
        <Animated.View className="w-full items-center" style={[rTaskContainerStyle]}>
            <Animated.View className="absolute justify-center items-center" style={[{
                height: LIST_ITEM_HEIGHT,
                right: '0%',
                width: LIST_ITEM_HEIGHT,
            }, rIconContainerStyle]}>
                <Trash size={LIST_ITEM_HEIGHT * 0.4} className="text-red-500" />
            </Animated.View>

            {/* // ===================== Animation Card ================= */}

            <PanGestureHandler
                simultaneousHandlers={simultaneousHandlers}
                onGestureEvent={panGesture}
            >
                <Animated.View className="w-full justify-center" style={[{ height: LIST_ITEM_HEIGHT }, rStyle]}>
                    <TouchableOpacity onPress={() => navigation.navigate(item?.screen_name, { ...item?.navigate })} activeOpacity={1} className="bg-white w-full   p-3 ios:py-4 " >
                        <View className="flex-row space-x-3 " >
                            <TouchableOpacity activeOpacity={0.7} className="rounded-full bg-slate-100 justify-center items-center" style={{ width: Hp(6.5), height: Hp(6.5) }}>
                                <NotificationBing color={COLORS.primary} size={Hp(4)} variant='Bold' />
                            </TouchableOpacity>
                            <View className="flex-1 ios:space-y-1">
                                <Text numberOfLines={1} className="text-black font-intSemi" style={{ fontSize: Hp(2) }}>{item?.notification?.title}</Text>
                                <Text numberOfLines={1} className="text-slate-500 font-intSemi" style={{ fontSize: Hp(1.7) }}>{item?.notification?.body}</Text>
                                <Text className='text-slate-500 font-intMed self-end' style={{ fontSize: Hp(1.6) }}>{formatTimestamp(item?.notification_time)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
};

export default SwipeToDelete;