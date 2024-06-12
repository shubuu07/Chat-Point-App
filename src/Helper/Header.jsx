import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ArrowLeft, CaretLeft } from 'phosphor-react-native';
import { Hp } from '../constants/theme';

const Header = ({ name, backBtn, RightBtn, shadow, upparcase }) => {
    const navigation = useNavigation()
    return (
        <View className="flex-row  z-20 justify-center px-3 py-1.5 items-center  bg-white w-full space-x-3 " style={!shadow && { shadowColor: '#bbb', shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 5 : 2 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 10 }}>
            {backBtn ? <View activeOpacity={.7} className="border border-slate-300 opacity-0 rounded-full p-1.5" >
                <CaretLeft weight='bold' className="text-black" size={Hp(3)} />
            </View> : <TouchableOpacity activeOpacity={.7} className=" p-1.5" onPress={() => navigation.goBack()}>
                <CaretLeft weight='bold' className="text-black" size={Hp(3.2)} />
            </TouchableOpacity>}
            <Text numberOfLines={1} className={`font-intSemi text-black text-center capitalize py-3 flex-1 self-center ${upparcase ? "uppercase" : "capitalize"}`} style={{ fontSize: Hp(2.2) }}>{name}</Text>
            {RightBtn ? RightBtn : <Text className="mx-10" />}
        </View>
    )
}

export default Header