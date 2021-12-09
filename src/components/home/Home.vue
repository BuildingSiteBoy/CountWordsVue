<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="span">
        <span>数词英语学习后台管理系统</span>
      </div>
      <el-button type="info" @click="toIndex" class="toIndex">前台</el-button>
      <el-button type="info" @click="logout" >退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px': '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="rgb(76, 83, 83)"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模版区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subitem.path "
             v-for="subitem in item.children" 
             :key='subitem.id' @click="saveNavState('/' + subitem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [
        {
          authName: "用户管理",
          id: 101,
          path: "user",
          order: 1,
          children: [
            {
              authName: "用户列表",
              id: 11,
              path: "user",
              order: 1,
            },
            {
              authName: "角色列表",
              id: 12,
              path: "role",
              order: 2,
            },
          ],
        },
         {
          authName: "内容管理",
          id: 102,
          path: "content",
          order: 1,
          children: [
            {
              authName: "单词笔记管理",
              id: 21,
              // path: "user",
              order: 1,
            },
            {
              authName: "听力材料管理",
              id: 22,
              // path: "role",
              order: 2,
            },
            {
              authName: "翻译材料管理",
              id: 23,
              // path: "role",
              order: 3,
            },
          ],
        },
        {
          authName: "测试管理",
          id: 103,
          path: "content",
          order: 1,
          children: [
            {
              authName: "考试结果管理",
              id: 31,
              // path: "user",
              order: 1,
            },
            {
              authName: "考试结果分析",
              id: 32,
              // path: "role",
              order: 2,
            }
          ],
        },
      ],
      iconObj:{
        '101': 'el-icon-user-solid',
        '102': 'el-icon-document-copy',
        '103': 'el-icon-s-data'
      },
      isCollapse: false,
      activePath:''
    };
  },
  created() {
    this.getmenulist();
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有菜单
    async getmenulist() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200)
        return this.$message.console.error(res.meta.msg);
      this.menulist = res.data;
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath

    },
    toIndex() {
        this.$router.push("/index");
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgb(55, 56, 59);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  font-size: 25px;
}

.el-aside {
  background-color: rgb(76, 83, 83);
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: rgb(234, 231, 241);
}

.home-container {
  width: 100%;
  height: 100%;
}

.el-icon-menu {
  margin-right: 20px;
}

.toggle-button {
  background-color: #34353b;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.toIndex {
    float: right;
    color: #000;
    background-color: rgb(93, 220, 252);
}
.span{
    margin-right: 30px;
}
</style>