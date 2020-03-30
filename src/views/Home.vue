<template>
  <div class="home">
    <div
      class="container d-flex justify-content-center align-items-center flex-column home__content--h100"
    >
      <div class="card w-50">
        <h5 class="card-header text-center">
          <i class="fab fa-slack"></i> Slack
        </h5>
        <div class="card-body">
          <div class="form-group">
            <label for="tokeninput">
              <i class="fas fa-key"></i>
              請輸入 Token
            </label>
            <input id="tokeninput" type="text" class="form-control" v-model="token" />
            <small id="tokenHelp" class="form-text text-muted">
              若沒有 Token 請
              <a
                href="https://api.slack.com/legacy/custom-integrations/legacy-tokens"
              >點擊此處</a>
              取得。
            </small>
          </div>
          <div class="text-center">
            <a href="#" class="btn btn-outline-primary" @click.prevent="login">
              Go to Slack
              <i class="fab fa-slack"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      token: '',
    };
  },
  methods: {
    login() {
      const vm = this;
      const config = {
        headers: {
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      if (vm.token.trim()) {
        vm.$http.post(`${process.env.VUE_APP_APIURL}/auth.test?token=${vm.token}`, '', config).then(async (res) => {
          if (res.data.user) {
            const userToken = await vm.$store.dispatch('cryptojs', vm.token);
            const user = await vm.$store.dispatch('cryptojs', res.data);
            localStorage.setItem('slackFiledata', JSON.stringify({
              userToken,
              user,
            }));
            vm.$router.push({
              name: 'channels',
              params: {
                token: vm.token.trim(),
                user: res.data,
              },
            });
          } else {
            vm.$swal({
              title: '您的 Token 有誤或是不存在，請重新輸入。',
              icon: 'error',
              showConfirmButton: true,
              timer: 5000,
            });
          }
        });
      } else {
        vm.$swal({
          title: '請輸入Token。',
          icon: 'error',
          showConfirmButton: true,
          timer: 5000,
        });
      }
    },
    async getlocalStorage() {
      const localStorageUser = JSON.parse(localStorage.getItem('slackFiledata')) || '';
      if (localStorageUser) {
        const decryptUser = await this.$store.dispatch('decryptjs', localStorageUser.user);
        const decryptToken = await this.$store.dispatch('decryptjs', localStorageUser.userToken);
        this.$router.push({
          name: 'channels',
          params: {
            token: decryptToken,
            user: decryptUser,
          },
        });
      }
    },
  },
  created() {
    this.getlocalStorage();
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100vh;
}
.home {
  &__content--h100 {
    height: 100vh;
  }
}
</style>
