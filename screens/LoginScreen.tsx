import qbittorrentServices from '../services/Qbit';
import { FlatList, SafeAreaView, StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import React from "react";
import * as SecureStore from 'expo-secure-store';
import { Snackbar } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';



export default function LoginScreen() {
    const [myDebug, onChangeMyDebug] = React.useState("")
    const [baseURL, onChangeURL] = React.useState("")
    const [username, onChangeUsername] = React.useState("")
    const [password, onChangePassword] = React.useState("")
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [snackbarError, setVisibleErorr] = React.useState(false);
    const onToggleSnackBarError = () => setVisibleErorr(!visible);
    const onDismissSnackBarError = () => setVisibleErorr(false);

    const debug = async() => {
        const tmp = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+myDebug)
        return JSON.stringify(tmp)
    }

    const storeData = async () => {
        try {
            await SecureStore.setItemAsync('baseURL', baseURL)
            await qbittorrentServices.login({ username: username, password: password }).then(async (data) => {
                if (data === 'Ok.') {
                    try {
                        onToggleSnackBar()
                        await SecureStore.setItemAsync('username', username)
                        await SecureStore.setItemAsync('password', password)
                    } catch (e) {
                        console.log('error securestore', e)
                    }
                } else {
                    onToggleSnackBarError()
                }
            })
        } catch (e) {
            console.log('ERROR', e)
        }
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }}
                onChangeText={onChangeURL}
                value={baseURL}
                placeholder="base url exemple: https://mydomain.com"
                autoCapitalize={'none'}
                autoCorrect={false}
            />
            <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1, padding: 10,}}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="username"
                autoCapitalize={'none'}
                autoCorrect={false}
            />
            <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }}
                onChangeText={onChangePassword}
                value={password}
                placeholder="password"
                autoCapitalize={'none'}
                secureTextEntry={true}
                autoCorrect={false}
                autoCompleteType={'password'}
            />
            <Button title="submit" onPress={() => storeData()} />
            <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }}
                onChangeText={onChangeMyDebug}
                value={myDebug}
                placeholder="myDebug"
                autoCapitalize={'none'}
                autoCorrect={false}
            />
            <Button title='test value' onPress={async() => (await debug().then((data) => Alert.alert('',data)))}/>
            <Snackbar visible={visible} onDismiss={onDismissSnackBar} style={styles.snackbar}>success</Snackbar>
            <Snackbar visible={snackbarError} onDismiss={onDismissSnackBarError} style={{flex:1,bottom:50,backgroundColor:'red'}}>fails</Snackbar>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    snackbar: {
        flex:1,
        bottom:50,
        backgroundColor:'green'
    },
})