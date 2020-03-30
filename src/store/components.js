import CryptoJS from 'crypto-js';

export default {
  state: {
    keyword: process.env.VUE_APP_CRYPTOKEY,
    isLoading: true,
  },
  mutations: {
    ISLOADING(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    cryptojs(context, data) {
      const crypto = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        context.state.keyword,
      ).toString();
      return crypto;
    },
    decryptjs(context, data) {
      const decrypt = CryptoJS.AES.decrypt(data, context.state.keyword);
      const result = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
      return result;
    },
    isLoading(context, status) {
      context.commit('ISLOADING', status);
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
};
