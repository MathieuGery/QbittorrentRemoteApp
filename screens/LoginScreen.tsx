import qbittorrentServices from '../services/Qbit';
import { FlatList, SafeAreaView, StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import React from "react";
import * as SecureStore from 'expo-secure-store';


export default function LoginScreen() {
    const [baseURL, onChangeURL] = React.useState("")
    const [username, onChangeUsername] = React.useState("")
    const [password, onChangePassword] = React.useState("")

    const storeData = async () => {
        try {
            await SecureStore.setItemAsync('baseURL', baseURL)
            qbittorrentServices.login({ username: username, password: password }).then(async (data) => {
                if (data === 'Ok.') {
                    try {
                        await SecureStore.setItemAsync('username', username)
                        await SecureStore.setItemAsync('password', password)

                    } catch (e) {
                        console.log('error securestore', e)
                    }
                } else {
                    Alert.alert('Invalid Credential')
                }
            })

        } catch (e) {
            console.log('ERROR', e)
        }
    }

    return (
        <SafeAreaView>
            <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }}
                onChangeText={onChangeURL}
                value={baseURL}
                placeholder="base url exemple: https://mydomain.com"
            />
            <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="username"
            />
            <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, }}
                onChangeText={onChangePassword}
                value={password}
                placeholder="password"
            />
            <Button title="submit" onPress={() => storeData()} />
        </SafeAreaView>
    );




};



