<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色英文名称" prop="name"></el-table-column>
        <el-table-column label="角色中文名称" prop="nameZh"></el-table-column>
        <el-table-column label="权限" prop="perms[0].nameZh"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              @change="roleStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button size="mini" type="warning" icon="el-icon-setting"
              >添加权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      roleList: [],
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 获取所有角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get("/admin/role");
      if (res.code !== 200) {
        return this.$message.error("获取角色列表失败");
      }
      this.roleList = res.result;
      console.log(this.roleList);
    },
    // 监听switch开关状态
    async roleStatusChange(roleInfo) {
      console.log(roleInfo);
      const { data: res } = await this.$http.put("/admin/role/status", {
        id: roleInfo.id,
        enable: roleInfo.enable,
        name: roleInfo.name,
        nameZh: roleInfo.nameZh
      });
      if (res.code !== 200) {
          roleInfo.enable = !roleInfo.enable
          return this.$message.error('更新角色状态失败')
      }
      this.$message.success('更新角色状态成功')
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
</style>