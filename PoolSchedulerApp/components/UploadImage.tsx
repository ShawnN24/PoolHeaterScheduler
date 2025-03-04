import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

export default function UploadImage({ sendImageData }) {
  const [image, setImage] = useState(null);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(_image);
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
      sendImageData(_image);
    }
  };

  // const  checkForCameraRollPermission=async()=>{
  //   const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //       alert("Please grant camera roll permissions inside your system's settings");
  //   }else{
  //       console.log('Media Permissions are granted')
  //   }
  // };

  // useEffect(() => {
  //   checkForCameraRollPermission()
  // }, []);

  return (
    <View style={imageUploaderStyles.container}>
        {image  && <Image source={{ uri: image }} style={{ width: 300, height: 100 }} />}
        <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:100,
        width:300,
        backgroundColor:'#efefef',
        borderRadius:10,
        overflow:'hidden',
        marginBottom:20
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'40%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})