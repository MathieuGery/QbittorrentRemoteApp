import * as React from 'react';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import TorrentCard from '../components/TorrentCard';
import qbittorrentServices from '../services/Qbit';
import { RootTabScreenProps } from '../types';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [torrentList, setTorrentList] = React.useState([]);
  const renderItem = ({ item }) => (
    <TorrentCard data={item} />
  );

  useEffect(() => {
    const fetchMyAPI = async () => {
      await qbittorrentServices.getActiveTorrentList().then((data) => {
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
        contentContainerStyle={{ paddingBottom: 30 }}
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
