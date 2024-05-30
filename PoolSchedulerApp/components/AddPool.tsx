import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import UploadImage from './UploadImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddPool = () => {
    const navigation = useNavigation();

    const [title, onChangeTitle] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [address, onChangeAddress] = React.useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [imageData, setImageData] = useState(null);
    const [errorVisible, setErrorVisible] = useState(false);

    function handleImageData(image) {
        setImageData(image);
    }

    const storePoolInfo = async() => {
        let value = {
            title: `${title}`,
            phone: `${phone}`,
            address: `${address}`,
            timeZone: `${selectedIndex}`,
            imageData: `${imageData}`
        };
        console.log(value);
        try{
            const tempVal = await AsyncStorage.getItem(`POOL.KEY.${title}`);
            if(tempVal === null){
                setErrorVisible(false);
                try {
                    const jsonValue = JSON.stringify(value);
                    await AsyncStorage.setItem(`POOL.KEY.${title}`, jsonValue); //key is pool title
                    navigation.navigate("index");
                } catch (error){
                    console.log("AsyncStorage error, pool information was not saved properly.");
                }
            } else {
                setErrorVisible(true);
            }
        } catch (error){
            console.log("Use a unique pool name.")
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <View 
            style={{ 
                margin: 20, 
                backgroundColor: "white", 
                borderRadius: 20, 
                borderColor: "black", 
                borderWidth: 1,
                alignSelf: "center", 
                height: "95%", 
                width: "90%",
                overflow:'hidden'
            }}>
                {/* Title */}
                <View
                    style={{flexDirection: "row", marginTop: 20, marginHorizontal: 20}}
                >
                    <Text
                        style={{ fontSize: 20, color: "red"}}
                    >
                        *
                    </Text>
                    <Text
                        style={{ fontSize: 20, marginRight: 10}}
                    >
                        Title:
                    </Text>
                    <TextInput 
                        style={{ height: 35, borderWidth: 1, flex: 1, borderRadius: 5, padding: 5 }}
                        onChangeText={onChangeTitle}
                        value={title}
                        placeholder="Pool Title"
                    />
                </View>
                {/* Phone */}
                <View
                    style={{flexDirection: "row", marginTop: 20, marginHorizontal: 20}}
                >
                    
                    <Text
                        style={{ fontSize: 20, marginRight: 10}}
                    >
                        Phone:
                    </Text>
                    <TextInput 
                        style={{ height: 35, borderWidth: 1, flex: 1, borderRadius: 5, padding: 5 }}
                        onChangeText={onChangePhone}
                        value={phone}
                        placeholder="Phone Number"
                    />
                </View>
                {/* Address */}
                <View
                    style={{flexDirection: "row", marginTop: 20, marginHorizontal: 20}}
                >
                    
                    <Text
                        style={{ fontSize: 20, marginRight: 10}}
                    >
                        Address:
                    </Text>
                    <TextInput 
                        style={{ height: 35, borderWidth: 1, flex: 1, borderRadius: 5, padding: 5 }}
                        onChangeText={onChangeAddress}
                        value={address}
                        placeholder="Pool Address"
                    />
                </View>
                {/* Time Zone */}
                <View>
                    <View
                        style={{flexDirection: "row", marginTop: 15, marginHorizontal: 20}}
                    >
                        <Text
                            style={{fontSize: 20, color: "red"}}
                        >
                            *
                        </Text>
                        <Text
                            style={{fontSize: 20}}
                        >
                            Time Zone:
                        </Text>
                    </View>
                    <View
                        style={{marginHorizontal: 10}}
                    >
                        <ButtonGroup 
                            buttons={['PST', 'MST', 'CST', 'EST']}
                            selectedIndex={selectedIndex}
                            onPress={(value) => {
                                setSelectedIndex(value);
                            }}
                            containerStyle={{borderRadius: 10}}
                        />
                    </View>
                </View>
                {/* Pic */}
                <View
                    style={{marginTop: 20, marginHorizontal: 20}}
                >
                    
                    <Text
                        style={{ fontSize: 20, marginRight: 10, marginBottom: 5}}
                    >
                        Pool Picture:
                    </Text>
                    <UploadImage sendImageData={handleImageData} />
                </View>
                {/* Save */}
                <View style={{flex: 1, justifyContent:"flex-end"}}>
                    {/* Error */}
                    {errorVisible == true ?
                    <View>
                        <Text
                            style={{ fontSize: 15, color: "red", marginBottom: 10, marginHorizontal: 20 }}
                        >
                            *Please use a unique pool name*
                        </Text>
                    </View>
                    :
                    <></>
                    }
                    {title != '' ? 
                        <TouchableOpacity
                            disabled={false}
                            style={{marginBottom: 20, marginHorizontal: 20, height: 35, borderWidth: 1, borderRadius: 5, padding: 5, alignItems:"center", backgroundColor:"red"}}
                            onPress={storePoolInfo}
                        >
                            <Text style={{color:"white", fontSize: 15, fontWeight: "bold"}}>SAVE</Text>
                        </TouchableOpacity>
                    : 
                        <TouchableOpacity
                            disabled={true}
                            style={{marginBottom: 20, marginHorizontal: 20, height: 35, borderWidth: 1, borderRadius: 5, padding: 5, alignItems:"center", backgroundColor:"pink"}}
                        >
                            <Text style={{color:"white", fontSize: 15, fontWeight: "bold"}}>SAVE</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}

export default AddPool;