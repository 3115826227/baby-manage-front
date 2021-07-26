<template>
    <div id="index">
        <div id="header">
            <el-row>
                <el-col :span="6" style="font-size:22px;padding-left:1%;padding-top:1%">
                    <label>宝宝煎米果后台</label>
                </el-col>
                <el-col :span="18" style="font-size:16px;text-align:right;padding-top:1.3%;padding-right:1.5%">
                    <el-dropdown style="color:white;" trigger="click" @command="handleCommand">
                        <span>{{detail.username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
        <div id="content">
            <div id="nav" style="float:left;width:17%">
            <el-menu class="el-menu-vertical-demo" mode="vertical" router :default-active="$route.path"
              @open="handleOpen" @close="handleClose"
              background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <asideBarItem v-for="router in routers" :router="router" :key="router.path">
              </asideBarItem>
            </el-menu>
            </div>
            <el-container id="panel" style="float:left">
                <el-main class="el-main">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="item in levelList" :key="item.path">
                        <span>{{item.name}}</span>
                    </el-breadcrumb-item>
                    </el-breadcrumb>
                    <Content></Content>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
import { logout } from '@/api/user'
import asideBarItem from '../components/Bar/asideBarItem'
import Content from '../components/Main/content'

export default {
  name: 'index',
  components: {
      asideBarItem,
      Content
  },
  data () {
    return {
      detail: {},
      isCollapse: true,
      levelList: []
    }
  },
  created () {
      this.getDetail()
  },
  computed: {
    routers () {
      console.log(this.$router.options.routes)
      return this.$router.options.routes[0].children
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getDetail () {
        this.detail.username = sessionStorage.getItem('username')
    },
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    },
    logout () {
      console.log('logout')
      logout()
        .then(function (response) {
          if (response.data.code === 0) {
            window.location.href = '/'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleCommand (command) {
        switch (command) {
        case "logout": this.logout()
        }
    },
    toPunch () {
      this.punchdialogVisible = true
    }
  }
}
</script>

<style scoped>
html, body, #index, #content, #panel {
    height: 100%;
}
#header {
    width: 100%;
    height: 65px;
    background-color: black;
    color: white;
}
#nav {
    height: 100%;
}
#nav ul {
    height: 100%;
}
</style>
