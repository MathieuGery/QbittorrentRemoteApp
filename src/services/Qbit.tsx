import request from './APIKit';

async function login(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data,
  });
}
const authServices = {
  login,
};



async function getApplicationVersion() {
  return request({
    url: '/app/version',
    method: 'get',
  });
}

async function getAPIVersion() {
  return request({
    url: '/app/webapiVersion',
    method: 'get',
  });
}

async function getBuildInfo() {
  return request({
    url: '/app/buildInfo',
    method: 'get',
  });
}

async function shutDownApplication() {
  return request({
    url: '/app/shutdown',
    method: 'get',
  });
}


async function getApplicationPreferences() {
  return request({
    url: '/app/preferences',
    method: 'get',
  });
}

async function setApplicationPreferences() {
  return request({
    url:'/app/setPreferences',
    method: 'get',
  });
}

async function getDefaultSavePath() {
  return request({
    url: '/app/defaultSavePath',
    method: 'get',
  });
}


async function getLog(normal = true, info = true, warning = true, critical = true, last_know_id = -1) {
  return request({
    url: '/log/main',
    method: 'post',
    data:{
      normal: normal,
      info: info,
      warning: warning,
      critical: critical,
      last_know_id: last_know_id,
    }
  });
}

async function getPeerLog(last_known_id=-1) {
  return request({
    url: '/log/peers',
    method: 'post',
    data:{
      last_known_id: last_known_id,
    }
  });
}

async function getMainData(rid=0) {
  return request({
    url: '/sync/maindata?rid=${rid}',
    method: 'get',
  });
}

async function getTorrentPeersData(hash, rid=0) {
  return request({
    url: '/sync/torrentPeers',
    method: 'post',
    data:{
      hash: hash,
      rid: rid,
    }
  });
}

async function getGlobalTransferInfo() {
  return request({
    url: '/transfer/info',
    method: 'get',
  });
}

async function getAlternativeSpeedLimitsState() {
  return request({
    url: '/transfer/speedLimitsMode',
    method: 'get',
  });
}

async function toggleAlernativeSpeedLimits() {
  return request({
    url: '/transfer/toggleSpeedLimitsMode',
    method: 'get',
  });
}

async function getGlobalDownloadLimit() {
  return request({
    url: '/transfer/downloadLimit',
    method: 'get',
  });
}

async function setGlobalDownloadLimit(limit) {
  return request({
    url: '/transfer/setDownloadLimit',
    method: 'post',
    data:{
      limit: limit*1024
    }
  });
}

async function getGlobalUploadLimit() {
  return request({
    url: '/transfer/uploadLimit',
    method: 'get',
  });
}

async function setGlobalUploadLimit(limit) {
  return request({
    url: '/transfer/setUploadLimit',
    method: 'post',
    data:{
      limit: limit*1024
    }
  });
}
//TODO 'Ban peers'


//TODO upgrade parameters torrent list
async function getTorrentList() {
  return request({
    url: '/torrents/info',
    method: 'get',
    data: {
    filter: '',
    category: '',
    tag: '',
    sort: '',
    serverse: '',
    limit: '',
    offset: '',
    hashes: '',
    }
  });
}




async function getTorrentGenericProperties(hash) {
  return request({
    url: '/torrents/properties',
    method: 'post',
    data: {
      hash: hash,
    }
  });
}


async function getTorrentTrackers(hash) {
  return request({
    url: '/torrents/trackers',
    method: 'post',
    data: {
      hash: hash,
    }
  });
}

async function getTorrentWebSeeds(hash) {
  return request({
    url: '/torrents/webseeds',
    method: 'post',
    data: {
      hash: hash,
    }
  });
}


export default qbittorrentServices;
