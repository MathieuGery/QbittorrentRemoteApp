import React, { memo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Colors, Text, Button, IconButton, FAB, Menu, Provider } from 'react-native-paper';
import FormatBytes from '../services/FormatBytes';

const TorrentCard = (props) => {
  const Upload = () => {
    if (props.data.upspeed) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', marginLeft: 5 }}>{FormatBytes(props.data.upspeed)}</Text>
          <View style={styles.triangle} />
        </View>
      )
    }
    return null
  }

  const Download = () => {
    if (props.data.dlspeed) {
      return (
        <View style={{ flexDirection: 'row',marginLeft:5 }}>
          <Text style={{ color: 'white' }}>{FormatBytes(props.data.dlspeed)}</Text>
          <View style={styles.triangleDown} />
        </View>
      )
    }
    return (
      null
    )
  }

  return (
    <Provider>
      <Card style={styles.card}>
        <Card.Content style={{ top: -10 }}>
          <View style={{ paddingRight: '5%', paddingTop: 0, marginTop: 0 }}>
            <Title style={styles.title} numberOfLines={1}>
              {props.data.name}
            </Title>
          </View>
          <IconButton onPress={() => {  }} icon='dots-vertical' color='white' size={27} style={{ position: 'absolute', right: -6, top: 4, borderRadius: 0, borderTopRightRadius: 12, paddingRight: 4 }} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.torrentSize}>
              {FormatBytes(props.data.completed)} / {FormatBytes(props.data.size)}
            </Text>
            <Text style={{ color: 'grey', marginRight: 5 }}>  •  {(props.data.progress * 100).toFixed(0)}%
            </Text>
            <Text style={styles.torrentCategory}>{props.data.category}
            </Text>
          </View>
          <ProgressBar progress={props.data.progress} color={Colors.blue100} style={{ marginVertical: 5, borderRadius: 5 }} />
          <View style={{ flexDirection: 'row-reverse' }}>
            <View style={{ position: 'absolute', flexDirection:'row' }}>
              <Upload />
              <Download />
            </View>
            <View style={{ position: 'absolute', right: 0, flexDirection: 'row' }}>
              <Text style={{ color: 'purple', marginRight: 9 }}>{props.data.state}</Text>
              <Text style={{ color: 'white' }}>ratio:{(props.data.ratio).toFixed(1)}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Provider>
  )
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222222',
    marginHorizontal: '2%',
    marginVertical: '2%',
    paddingHorizontal: 0,
    borderRadius: 12,
    justifyContent: "center",
    top: 10,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    marginTop: 7,
    marginLeft: 5,
  },
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    marginTop: 7,
    marginLeft: 5,
    transform: [{ rotate: "180deg" }]
  },
  title: {
    color: '#FFFFFF',
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



