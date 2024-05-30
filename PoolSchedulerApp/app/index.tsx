import { Stack, useRouter } from "expo-router";
import { SafeAreaView, ScrollView, Text, View, StatusBar, TouchableOpacity } from "react-native";
import moment from "moment";
import React, { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import PoolList from "@/components/PoolList";
import AddPoolBtn from "@/components/AddPool";
import SettingsBtn from "@/components/Settings";
import type {StatusBarStyle} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('dark-content');
    const [statusBarTransition, setStatusBarTransition] = useState('fade');

    const changeStatusBarVisibility = () => setHidden(hidden);
    const changeStatusBarStyle = () => setStatusBarStyle(statusBarStyle);
    const changeStatusBarTransition = () => setStatusBarTransition(statusBarTransition);


    const date = moment().format('dddd, h:mm a');

    return (
        <View>
            <StatusBar 
                backgroundColor="white"
                barStyle={statusBarStyle}
                hidden={false}
            />
            <SafeAreaView>
                {/* Similar to Navbar */}
                <Stack.Screen 
                    options={{
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Add Pool")}
                            >
                                <AntDesign name="plussquareo" size={30} color="black" />
                            </TouchableOpacity>
                        ),
                        headerTitle: "",
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Settings")}
                            >
                                <Ionicons name="settings-outline" size={34} color="black" />
                            </TouchableOpacity>
                        )
                    }}
                />
                {/* Scrolling Page Container */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <PoolList />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default Home;