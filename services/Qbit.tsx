import request from './APIKit';
import axios from 'axios';

async function login(data: { username: string; password: string; }) {
  return request({
    url: '/auth/login',
    method: 'get',
    params: {
      username: data.username,
      password: data.password
    }
  });
}

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
    url: '/app/setPreferences',
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
    method: 'get',
    params: {
      normal: normal,
      info: info,
      warning: warning,
      critical: critical,
      last_know_id: last_know_id,
    }
  });
}

async function getPeerLog(last_known_id = -1) {
  return request({
    url: '/log/peers',
    method: 'get',
    params: {
      last_known_id: last_known_id,
    }
  });
}

async function getMainData(rid = 0) {
  return request({
    url: '/sync/maindata',
    method: 'get',
    params: {
      rid: rid,
    }
  });
}

async function getTorrentPeersData(hash, rid = 0) {
  return request({
    url: '/sync/torrentPeers',
    method: 'get',
    params: {
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
    method: 'get',
    params: {
      limit: limit * 1024
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
    method: 'get',
    params: {
      limit: limit * 1024
    }
  });
}
//TODO 'Ban peers'


//TODO upgrade parameters torrent list
async function getTorrentList(hashes) {
  return request({
    url: '/torrents/info',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}

async function getActiveTorrentList() {
  return request({
    url: '/torrents/info',
    method: 'get',
    params: {
      filter: 'active',
    }
  });
}

async function getDownloadingTorrentList() {
  return request({
    url: '/torrents/info',
    method: 'get',
    params: {
      filter: 'downloading',
    }
  });
}



async function getTorrentGenericProperties(hash) {
  return request({
    url: '/torrents/properties',
    method: 'get',
    params: {
      hash: hash,
    }
  });
}


async function getTorrentTrackers(hash) {
  return request({
    url: '/torrents/trackers',
    method: 'get',
    params: {
      hash: hash,
    }
  });
}

async function getTorrentWebSeeds(hash) {
  return request({
    url: '/torrents/webseeds',
    method: 'get',
    params: {
      hash: hash,
    }
  });
}

async function getTorrentContents(hash, indexes = null) {
  return request({
    url: '/torrents/files',
    method: 'get',
    params: {
      hash: hash,
      indexes: indexes,
    }
  });
}


async function getTorrentPiecesStates(hash) {
  return request({
    url: '/torrents/pieceStates',
    method: 'get',
    params: {
      hash: hash,
    }
  });
}

async function getTorrentPiecesHashes(hash)
//The hashes of the torrents you want to pause. hashes can contain multiple hashes separated by |, to pause multiple torrents, or set to all, to pause all torrents.
{
  return request({
    url: '/torrents/pieceHashes',
    method: 'get',
    params: {
      hash: hash,
    }
  });
}

async function pauseTorrents(hashes) {
  return request({
    url: '/torrents/pause',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}

async function resumeTorrents(hashes)
//The hashes of the torrents you want to resume. hashes can contain multiple hashes separated by |, to resume multiple torrents, or set to all, to resume all torrents.
{
  return request({
    url: '/torrents/resume',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}

async function deleteTorrent(hashes, deleteFiles)
//deleteFiles	If set to true, the downloaded data will also be deleted
{
  return request({
    url: '/torrents/delete',
    method: 'get',
    params: {
      hashes: hashes,
      deleteFiles: deleteFiles,
    }
  });
}


async function recheckTorrrents(hashes) {
  return request({
    url: '/torrents/recheck',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}

async function reannouceTorrents(hashes) {
  return request({
    url: '/torrents/reannounce',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}

//TODO add torrent
//TODO add tracker to torrent 



async function editTracker(hash, origUrl, newUrl) {
  return request({
    url: '/torrents/editTracker',
    method: 'get',
    params: {
      hash: hash,
      origUrl: origUrl,
      newUrl: newUrl
    }
  });
}

async function removeTrackers(hash, urls) {
  return request({
    url: '/torrent/removeTrackers',
    method: 'get',
    params: {
      hash: hash,
      urls: urls
    }
  });
}

async function addPeers(hashes, peers) {
  return request({
    url: '/torrent/addPeers',
    method: 'get',
    params: {
      hashes: hashes,
      peers: peers,
    }
  });
}

async function increaseTorrentPriority(hashes) {
  return request({
    url: '/torrent/increasePrio',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}


async function decreaseTorrentPriority(hashes) {
  return request({
    url: '/torrent/decreasePrio',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}



async function maximalTorrentPriority(hashes) {
  return request({
    url: '/torrent/topPrio',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}


async function minimalTorrentPriority(hashes) {
  return request({
    url: '/torrent/bottomPrio',
    method: 'get',
    params: {
      hashes: hashes,
    }
  });
}

async function setFilePriority(hashes, id, priority) {
  return request({
    url: '/torrent/filePrio',
    method: 'get',
    params: {
      hashes: hashes,
      id: id,
      priority: priority,
    }
  });
}



//TODO Get torrent download limit
//TODO Set torrent download limit
//TODO Set torrent share limit



async function addTorrent(urls, category, skip_checking, paused) {
  return request({
    url: '/torrents/add',
    method: 'get',
    params: {
      urls: urls,  //urls
      category: category, //category
    }
  });
}

async function getAllCategories() {
  return request({
    url: '/torrents/categories',
    method: 'get',
  });
}


const qbittorrentServices = {
  login,
  getTorrentList,
  getGlobalTransferInfo,
  getAPIVersion,
  toggleAlernativeSpeedLimits,
  pauseTorrents,
  recheckTorrrents,
  reannouceTorrents,
  getTorrentPiecesStates,
  getTorrentContents,
  deleteTorrent,
  getTorrentPiecesHashes,
  resumeTorrents,
  getTorrentWebSeeds,
  getTorrentTrackers,
  getTorrentGenericProperties,
  getAlternativeSpeedLimitsState,
  setGlobalUploadLimit,
  getGlobalUploadLimit,
  setGlobalDownloadLimit,
  getGlobalDownloadLimit,
  getTorrentPeersData,
  getMainData,
  getPeerLog,
  getLog,
  getDefaultSavePath,
  getBuildInfo,
  getApplicationPreferences,
  addTorrent,
  getActiveTorrentList,
  getDownloadingTorrentList,
  getAllCategories
};

export default qbittorrentServices;
