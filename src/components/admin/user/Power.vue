<template>
  <div>
    <!--面包屑模块-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 权限列表区域 -->
      <el-table :data="powerList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="权限英文名"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="权限中文名"
          prop="nameZh"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      powerList: [],
    };
  },
  created() {
    this.getPowerList();
  },
  methods: {
    async getPowerList() {
      const { data: res } = await this.$http.get("/admin/role/perm");
      if (res.code !== 200)
        return this.$message.error("获取权限列表失败");
      this.powerList = res.result;
     
    
    },
  },
};
</script>

<style lang="less" scoped>
</style>