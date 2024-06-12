import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Hp } from '../../constants/theme'

const ButtonUnfill = ({ onPress, title, iosStyle, loader }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={loader} activeOpacity={0.9} className={!iosStyle ? "w-full border border-black bg-white rounded-full py-3.5 ios:py-[17px] justify-center items-center ios:mb-5" : "w-full bg-white border border-black rounded-full py-3.5 ios:py-[17px] justify-center items-center"}>
            {loader ? <View className='flex-row items-center space-x-1.5' >
                <Text className="font-ftBold text-black" style={{ fontSize: Hp(2.1) }}>Please wait...</Text>
                <ActivityIndicator size={"small"} color={"#fff"} />
            </View> : <Text className="font-ftBold text-black" style={{ fontSize: Hp(2.3) }}>{title}</Text>}
        </TouchableOpacity>
    )
}

export default ButtonUnfill