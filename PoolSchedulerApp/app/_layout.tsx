import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import index from "./index";
import AddPool from "../components/AddPool";
import Settings from "../components/Settings";
import PoolSchedule from "@/components/PoolSchedule";

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen name="index" component={index} />
        <Stack.Screen name="Add Pool" component={AddPool} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Pool Schedule" component={PoolSchedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
