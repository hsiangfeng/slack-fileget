<template>
  <div class="mb-2">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <i class="fab fa-slack"></i>
        {{ user.team }}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button class="btn btn-outline-primary my-2 ml-2 my-sm-0" type="submit" @click="removeToken">
            <i class="fas fa-sign-out-alt"></i> 登出
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      user: '',
    };
  },
  methods: {
    removeToken() {
      localStorage.removeItem('slackFiledata');
      this.$router.push('/');
    },
  },
  created() {
    if (this.$route.params.token) {
      this.token = this.$route.params.token;
      this.user = this.$route.params.user;
    }
  },
};
</script>
