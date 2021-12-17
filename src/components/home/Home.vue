<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="span">
        <span>数词英语后台管理系统</span
        ><el-button type="info" @click="toIndex" class="toIndex"
          >前台</el-button
        >
        <el-button type="info" @click="logout" class="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
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
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模版区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="saveNavState('/' + subitem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subitem.authName }}</span>
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
            {
              authName: "权限列表",
              id: 13,
              path: "power",
              order: 3,
            },
          ],
        },
        {
          authName: "内容管理",
          id: 102,
          path: "content",
          order: 2,
          children: [
            {
              authName: "单词笔记管理",
              id: 21,
              path: "word",
              order: 1,
            },
            {
              authName: "听力材料管理",
              id: 22,
              path: "listen",
              order: 2,
            },
            {
              authName: "书籍材料管理",
              id: 23,
              path: "book",
              order: 3,
            },
            {
              authName: "文章材料管理",
              id: 24,
              path: "article",
              order: 4,
            },
          ],
        },
        {
          authName: "测试管理",
          id: 103,
          path: "text",
          order: 1,
          children: [
            {
              authName: "考试结果管理",
              id: 31,
              path: "testResult",
              order: 1,
            },
            {
              authName: "考试结果分析",
              id: 32,
              path: "testAnalysis",
              order: 2,
            },
          ],
        },
        {
          authName: "留言板管理",
          id: 104,
          path: "messageControl",
          order: 4,
          children: [
            {
              authName: "留言板",
              id: 41,
              path: "message",
              order: 1,
            },
          ],
        },
      ],
      iconObj: {
        101: "el-icon-user-solid",
        102: "el-icon-document-copy",
        103: "el-icon-s-data",
        104: "el-icon-document",
      },
      isCollapse: true,
      activePath: "",
    };
  },
  created() {

    this.activePath = window.sessionStorage.getItem("activePath");
  },

  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    toIndex() {
      this.$router.push("/index");
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgb(29, 68, 83);
  // display: flex;
  // justify-content: flex-start;
  height: 400px;
  align-items: center;
  line-height: 60px;
  color: #fff;
  font-size: 25px;
}

.el-aside {
  background-color: rgb(77, 112, 127);
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #f2f4fa;
  // background-color: #b1d1ee;
}

.home-container {
  width: 100%;
  height: 100%;
}

.el-icon-menu {
  margin-right: 20px;
}

.toggle-button {
  background-color: rgb(77, 112, 127);
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.toIndex {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  background-color: #ae4949;
}

.logout {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  background-color: rgb(77, 112, 127);
}

.span {
  margin-right: 30px;
}

.el-main {
  position: relative;
}
</style>