import { Text } from "react-native";
import { Hp } from "../../constants/theme";

export default function TextError({ title }) {
    return (
        <Text type="error" className="text-red-500 m-2 mb-0 font-ftSemi" style={{ fontSize: Hp(1.7) }}>
            {title}
        </Text>
    )
}