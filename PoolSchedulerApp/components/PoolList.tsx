import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';

export default function PoolList() {

    const importData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            return result.map(req => JSON.parse(req)).forEach(console.log);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <Text style={{ alignSelf: "center", color: "gray", paddingTop: "50%" }}>
                Press the <AntDesign name="plussquareo" color="grey" /> in the top left to add a pool.
            </Text>
        </View>
    );
}