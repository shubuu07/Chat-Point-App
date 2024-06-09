import { View, Text } from 'react-native'
import SwitchToggles from './SwitchToggles'
import { Hp } from '../constants/theme'

const CustomSwitch = ({ Headtitle, ViewStyle, headStyle, toggleVal, toggleFun }) => {
    return (
        <View className={`${ViewStyle} items-center `}>
            <Text className={`${headStyle ? headStyle : "text-gray-400 font-intMed"} `} style={{ fontSize: Hp(2) }}>{Headtitle}</Text>
            <View className='' >
                <SwitchToggles toggleVal={toggleVal} toggleFun={toggleFun} />
            </View>
        </View>
    )
}

export default CustomSwitch