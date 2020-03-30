import Axios from 'axios';

export default {
  state: {
    config: {
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    privateChannel: [],
    publicChannel: [],
    fileList: {
      files: '',
      paging: '',
    },
  },
  mutations: {
    PUBLICCHANNEL(state, payload) {
      state.publicChannel = payload;
    },
    PRIVATECHANNEL(state, payload) {
      state.privateChannel = payload;
    },
    FILE(state, payload) {
      state.fileList.files = payload;
    },
    FILEPAGE(state, payload) {
      state.fileList.paging = payload;
    },
  },
  actions: {
    getChannels(context, { types, data }) {
      context.dispatch('isLoading', true);
      Axios.get(`${process.env.VUE_APP_APIURL}/conversations.list?token=${data}&types=${types}&limit=500`, context.state.config)
        .then((res) => {
          if (types === 'private_channel') {
            context.commit('PRIVATECHANNEL', res.data.channels);
          } else {
            context.commit('PUBLICCHANNEL', res.data.channels);
          }
          context.dispatch('isLoading', false);
        });
    },
    getFile(context, {
      page, channelsID, token,
    }) {
      context.dispatch('isLoading', true);
      Axios.get(`${process.env.VUE_APP_APIURL}/files.list?token=${token}&channel=${channelsID}&page=${page}`, context.state.config)
        .then((res) => {
          context.commit('FILE', res.data.files.reverse());
          context.commit('FILEPAGE', res.data.paging);
          context.dispatch('isLoading', false);
        });
    },
  },
  getters: {
    privateChannel(state) {
      return state.privateChannel;
    },
    publicChannel(state) {
      return state.publicChannel;
    },
    fileList(state) {
      return state.fileList;
    },
  },
};
