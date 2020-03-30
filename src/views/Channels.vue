<template>
  <div class="channels container-fluid">
    <loading :active.sync="isLoading"></loading>
    <Navbar></Navbar>
    <div class="row">
      <div class="col-md-2 channels__list">
        <div class="channels__private">
          <h5>Private Channel</h5>
          <form>
            <div class="form-group">
              <input
                type="search"
                name="search"
                id="privatechannelID"
                class="form-control"
                placeholder="篩選私密頻道"
                v-model="filterPrivateChannel"
              />
            </div>
          </form>
          <div class="list-group">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              v-for="(item, index) in privateFilter"
              :key="index"
              :class="item.name === active ? 'active' : ''"
              @click.prevent="getFile(1, item.id, item.name)"
            >
              <i class="fas fa-lock"></i>
              {{ item.name }}
            </a>
          </div>
        </div>
        <div class="channels__public">
          <h5>Public Channel</h5>
          <form>
            <div class="form-group">
              <input
                type="search"
                name="search"
                id="publicchannelID"
                class="form-control"
                placeholder="篩選公開頻道"
                v-model="filterPublicChannel"
              />
            </div>
          </form>
          <div class="list-group">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              v-for="(item, index) in publicFilter"
              :key="index"
              :class="item.name === active ? 'active' : ''"
              @click.prevent="getFile(1, item.id, item.name)"
            >
              <i class="fas fa-hashtag"></i>
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-10 channels__file">
        <div class="channels__file__true" v-if="fileList.files">
          <h2>Channels</h2>
          <div class="alert alert-primary" role="alert">
            您現在正在查看
            <span class="font-weight-bold">{{ active }}</span>
            頻道
            <br />該頻道有
            <span class="font-weight-bold">{{ fileList.paging.total }}</span>
            檔案
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                class="page-item"
                v-for="(item, index) in fileList.paging.pages"
                :key="index"
                :class="item === fileList.paging.page? 'active': ''"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="getFile(item, nowChannelID, active)"
                >{{ item }}</a>
              </li>
            </ul>
          </nav>
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr class="text-center">
                <td class="align-middle">ID</td>
                <td class="align-middle">檔案名稱</td>
                <td class="align-middle">檔案類型</td>
                <td class="align-middle">建立時間</td>
                <td class="align-middle">功能操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in fileList.files" :key="index">
                <td class="text-center align-middle">{{ index + 1 }}</td>
                <td class="align-middle">{{ item.name }}</td>
                <td class="text-center align-middle">{{ item.filetype }}</td>
                <td class="text-center align-middle">{{ item.created | timestamp }}</td>
                <td class="text-center align-middle">
                  <a :href="item.url_private_download">下載檔案</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="channels__file__false" v-else>
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <span class="font-weight-bold">{{ user.user }}</span>，你好！
              <br />您目前正在查看
              <span class="font-weight-bold">{{ user.team }}</span> 頻道。
              <br />請從左側功能列選擇 Channels。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Channels',
  components: {
    Navbar,
  },
  data() {
    return {
      token: '',
      user: '',
      nowChannelID: '',
      filterPrivateChannel: [],
      filterPublicChannel: [],
      active: '',
    };
  },
  methods: {
    getFile(page = 1, channelsID, active) {
      this.active = active;
      this.nowChannelID = channelsID;
      this.$store.dispatch('getFile',
        {
          token: this.token,
          channelsID: this.nowChannelID,
          page,
        });
    },
  },
  computed: {
    privateFilter() {
      return this.privateChannel.filter((item) => {
        if (this.filterPrivateChannel === '') {
          return this.privateChannel;
        }
        return item.name.match(this.filterPrivateChannel);
      });
    },
    publicFilter() {
      return this.publicChannel.filter((item) => {
        if (this.filterPublicChannel === '') {
          return this.publicChannel;
        }
        return item.name.match(this.filterPublicChannel);
      });
    },
    ...mapGetters(['isLoading', 'privateChannel', 'publicChannel', 'fileList']),
  },
  async created() {
    if (this.$route.params.token) {
      this.token = this.$route.params.token;
      this.user = this.$route.params.user;
      await this.$store.dispatch('getChannels', { types: 'private_channel', data: this.token });
      await this.$store.dispatch('getChannels', { types: 'public_channel', data: this.token });
    } else {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">
.channels__list,
.channels__file {
  height: 100vh;
  overflow-y: auto;
}
.channels__public {
  margin-top: 10px;
}
</style>
