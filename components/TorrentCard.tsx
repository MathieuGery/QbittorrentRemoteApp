import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Colors, Text } from 'react-native-paper';



const TorrentCard = (props) => {
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  const completed = formatBytes(props.data.completed)
  const size = formatBytes(props.data.size)
  const ratio = (props.data.ratio).toFixed(1)
  const upload = formatBytes(props.data.upspeed)
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title} numberOfLines={1}>{props.data.name}</Title>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.torrentSize}>
            {completed} / {size}
          </Text>
          <Text style={{ color: 'grey', marginRight: 5 }}>  •  {props.data.progress * 100}%
          </Text>
          <Text style={styles.torrentCategory}>{props.data.category}
          </Text>
        </View>
        <ProgressBar progress={props.data.progress} color={Colors.blue100} style={{ marginVertical: 5 }} />
        <View style={{ flexDirection: 'row-reverse' }}>
          <Text style={{ color: 'white', }}>{upload}</Text>
          <View style={{position: 'absolute', right:0, flexDirection:'row'}}>
          <Text style={{ color: 'purple', marginRight:9}}>{props.data.state}</Text>
            <Text style={{ color: 'white', }}>ratio:{ratio}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  )
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222222',
    marginHorizontal: '2%',
    marginVertical: '2%',
    padding: 0,
    borderRadius: 20,
    justifyContent: "center",
  },
  title: {
    color: '#FFFFFF'
  },
  torrentSize: {
    color: 'grey',
  },
  torrentCategory: {
    backgroundColor: 'dodgerblue',
    color: 'white',
    borderRadius: 3,
    paddingHorizontal: '1%'
  },
});

export default memo(TorrentCard);


