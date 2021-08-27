
import React, { useState, memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import TorrentCard from '../components/Card';
import { Navigation } from '../types';
type Props = {
  navigation: Navigation;
};

const DashboardScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });


  return (
    <TorrentCard/>
  );
};

export default memo(DashboardScreen);
