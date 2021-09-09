import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, ProgressBar, Colors, Surface } from 'react-native-paper';
import qbittorrentService from '../services/Qbit';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

type Props = {
  children: React.ReactNode;
};

const TorrentCard = ({ children }: Props) => {
  const _onPressed = async () => {
    await qbittorrentService.login(
      {username: "", password: ""},
    )
      .then((data) => console.log(data))
      .catch((error) => {
        alert(error)});
  }; 

  const _onPressed2 = async () => {
    await qbittorrentService.getAPIVersion()
    .then((data) => console.log(data))
      .catch((error) => {
        alert(error)});
  }; 
  return (
    <Card style={styles.card}>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent}/>
    <Card.Content>
      <Title>torrent title</Title>
      <Paragraph>
      <Text style={styles.torrentSize}>
      0/10 GB
      </Text>
      <Text style={styles.torrentPercentage}>  .  x% 
      </Text>
      <Text style={styles.torrentCategory}>{'\t'}jeux
      </Text>
      </Paragraph>
    </Card.Content>
    <ProgressBar progress={0.75} color={Colors.black} />
    <Button mode="contained" onPress={_onPressed}>
    Connect
  </Button>
   <Button mode="contained" onPress={_onPressed2}>
    get torrents list 
  </Button>
  </Card>
  )
  };

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        elevation: 104,
        color: Colors.red800,
        justifyContent:"center",
    },
    statusBar: {
        color: 'blue'
    },
    torrentSize:{
      color: 'grey'
    },
    torrentPercentage:{
      
    },
    torrentCategory:{
      backgroundColor: 'dodgerblue',
      borderRadius: 100000
    },
  });

export default memo(TorrentCard);


