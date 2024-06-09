import SwitchToggle from 'react-native-switch-toggle';
import { COLORS } from '../constants/theme';

const SwitchToggles = ({ toggleVal, toggleFun }) => {
    return (
        <SwitchToggle
            switchOn={toggleVal}
            onPress={toggleFun}
            circleColorOff="#FFF"
            circleColorOn="#FFF"
            backgroundColorOn={COLORS.primary}
            backgroundColorOff="#cbd5e1"
            containerStyle={{
                width: 55,
                height: 30,
                borderRadius: 20,
                padding: 5,
            }}
            circleStyle={{
                width: 22,
                height: 22,
                borderRadius: 20,
            }}
        />
    )
}

export default SwitchToggles