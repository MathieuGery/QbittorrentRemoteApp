import { StatusBar, StyleSheet, View, Text, Alert, Dimensions } from 'react-native';
import React from 'react';
import { Menu, Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useCachedResources from './hooks/useCachedResources';
import TabOneScreen from './screens/TabOneScreen';
import TabTwoScreen from './screens/TabTwoScreen';
import LoginScreen from './screens/LoginScreen';
import DownloadingScreen from './screens/DownloadingSreen';
import { IconButton, Colors, FAB } from 'react-native-paper';
import qbittorrentServices from './services/Qbit';
import FormatBytes from './services/FormatBytes';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';


const Tab = createMaterialTopTabNavigator();
const login = async () => {
  await qbittorrentServices.login({ username: SecureStore.getItemAsync('username'), password: await SecureStore.getItemAsync('password') })
}
login()

export default function App() {
  const [Download, setDownload] = React.useState(0)
  const [upLoad, setUpload] = React.useState(0)
  const isLoadingComplete = useCachedResources();
  const [category, setCategory] = React.useState("")
  const getDownload = setInterval(async () => {
    await qbittorrentServices.getGlobalTransferInfo().then((data) => { setDownload(data.dl_info_speed), setUpload(data.up_info_speed) })
  }, 1000)
  const CategoryMenu = async () => {
    await qbittorrentServices.getAllCategories().then((data) => setCategory(data))
    console.log(category)
  }
  async function uploadTorrent() {
    const doc = await DocumentPicker.getDocumentAsync()
    const data = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + "/DocumentPicker/" + (doc.uri).split('/DocumentPicker/')[1])
    const bite = await FileSystem.uploadAsync("https://qbittorrent.gideon.ovh/api/v2/torrents/add", data.uri, { headers: { 'Content-Type': 'application/octet-stream' }, uploadType: FileSystem.FileSystemUploadType.MULTIPART, fieldName: "torrents", parameters: { 'category': 'anims' } })
    return JSON.stringify(bite)
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ tabBarScrollEnabled: true, tabBarStyle: { backgroundColor: 'black' }, tabBarLabelStyle: { color: 'white' } }} style={styles.container}>
          <Tab.Screen name="All" component={TabOneScreen} />
          <Tab.Screen name="Active" component={TabTwoScreen} />
          <Tab.Screen name="downloading" component={DownloadingScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
        {/* <View style={{ backgroundColor: 'red'}}> */}
        <View style={{ backgroundColor: 'black', flexDirection: 'row', opacity: 0.8, bottom: 0, justifyContent: 'space-around' }} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.stats}>
              {FormatBytes(Download)}
            </Text>
            <View style={styles.triangleDown} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.triangle} />
            <Text style={styles.stats}>
              {FormatBytes(upLoad)}
            </Text>
          </View>
        </View>
        {/* <View style={{ backgroundColor: 'green', flexDirection: 'row', justifyContent: 'space-around' }} >
            <IconButton icon="camera" color={Colors.red100} onPress={async () => { console.log('icon button') }} style={styles.button} />
            <IconButton icon="camera" color={Colors.red100} onPress={async () => { console.log('zéphyr') }} style={styles.button} />
            <IconButton icon="camera" color={Colors.red100} onPress={() => { CategoryMenu() }} style={styles.button} />
            <IconButton icon="camera" color={Colors.red100} onPress={() => { uploadTorrent() }} style={styles.button} />
          </View> */}
        {/* </View> */}
        <FAB icon="plus" onPress={async () => { await uploadTorrent().then((data) => Alert.alert('', data)) }} style={{ position: 'absolute', bottom: 20, right: 0, backgroundColor: '#219ebc' }} />
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} hidden={false} translucent />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: StatusBar.currentHeight,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  button: {
    borderRadius: 0,
  },
  stats: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 5
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    marginTop: 7
  },
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    marginTop: 7,
    transform: [{ rotate: "180deg" }]
  },
})