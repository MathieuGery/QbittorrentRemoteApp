import * as React from 'react';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import TorrentCard from '../components/TorrentCard';
import qbittorrentServices from '../services/Qbit';



export default function DownloadSreen() {
    const [torrentList, setTorrentList] = React.useState([]);

    const renderItem = ({ item }) => (
        <TorrentCard data={item} />
    );
    useEffect(() => {

        const fetchMyAPI = async () => {
            await qbittorrentServices.getDownloadingTorrentList().then((data) => {
                setTorrentList(data)
            }).catch((err) => console.log(err))
        }
        setInterval(() => { fetchMyAPI() }, 1000)
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.flatlist}
                data={torrentList}
                renderItem={renderItem}
                keyExtractor={item => item.hash}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    flatlist: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
    }
});
