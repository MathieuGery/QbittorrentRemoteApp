import React, { memo } from 'react';
import Background from '../components/Background';
import DashboardScreen from './DashboardScreen';
import Logo from '../components/Logo';
import { ScrollView } from 'react-native';

import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (

  <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
  <DashboardScreen/>
  </ScrollView>
);

export default memo(HomeScreen);
