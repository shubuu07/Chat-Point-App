import { View, Text } from 'react-native';
import { Hp } from '../../constants/theme'
import { BoxSearch } from 'iconsax-react-native'

const EmptyList = ({ text, text2, style }) => {
    return (
        <View className={style ? style : 'flex-1  items-center justify-center space-y-5'} >
            <BoxSearch size={Hp(10)} className="text-slate-300" variant='TwoTone' />
            <View className='space-y-1 ios:space-y-2' >
                <Text className="font-ftSemi text-center text-black capitalize" style={{ fontSize: Hp(2.3) }}>{text ? text : 'Sorry, No results found!'}</Text>
                <Text className="font-ftMed text-center text-slate-500 px-8" style={{ fontSize: Hp(1.8) }}>{text2}</Text>
            </View>
        </View>
    )
}

export default EmptyList