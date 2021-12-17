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
          <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色英文名称" prop="name"></el-table-column>
        <el-table-column label="角色中文名称" prop="nameZh"></el-table-column>
        <el-table-column label="权限">
          <template slot-scope="scope">
            <span v-for="item in scope.row.perms" :key="item.id">
              {{ item.nameZh }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              @change="roleStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button 
            size="mini" 
            type="primary" 
            icon="el-icon-edit"
            @click="showRoleEditDialog(scope.row)"
              >编辑</el-button
            >
            <el-button 
            size="mini" 
            type="danger" 
            icon="el-icon-delete"
            @click="removeRoleById(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色的对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="30%"
      @close="addRoleDialogClose"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="addRoleFormRef"
        label-width="70px"
      >
        <el-form-item prop="name" label="英文名">
          <el-input
            type="text"
            v-model="addRoleForm.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nameZh" label="中文名">
          <el-input
            type="text"
            v-model="addRoleForm.nameZh"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="enable" label="状态">
          <el-input
            type="text"
            v-model="addRoleForm.enable"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加编辑角色的对话框 -->
    <el-dialog
      title="修改角色信息"
      :visible.sync="editRoleDialogVisible"
      width="50%"
      @close="editRoleDialogClose"
    >
      <el-form :model="selectedRole" ref="selectedRoleRef" label-width="70px">
        <el-form-item label="英文名">
          <el-input v-model="selectedRole.name"></el-input>
        </el-form-item>
        <el-form-item label="中文名">
          <el-input v-model="selectedRole.nameZh"></el-input>
        </el-form-item>
        <el-form-item label="权限分配" prop="perms">
          <el-checkbox-group v-model="selectedPowersIds" :max="3">
            <el-checkbox
              v-for="(power, i) in powerList"
              :key="i"
              :label="power.id"
              >{{ power.nameZh }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo(selectedRole)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      roleList: [],
      // 控制添加角色对话框的显示与隐藏
      addRoleDialogVisible: false,
      // 添加角色的表单数据
      addRoleForm: {
        nameZh: "",
        name: "",
        enable: "",
        perms: [
          {
            id: "",
            name: "",
            nameZh: "",
            path: "",
          },
        ],
      },
      // 添加表单的验证规则对象
      addRoleFormRules: {},
      // 控制修改角色对话框的显示与隐藏
      editRoleDialogVisible: false,
      // 被选中的角色
      selectedRole: [],
      // 被选中的权限id
      selectedPowersIds: [],
      // 权限列表
      powerList: [],
    };
  },
  created() {
    this.getRoleList();
    this.getPowerList();
  },
  methods: {
    // 获取所有角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get("/admin/role");

      if (res.code !== 200) {
        return this.$message.error("获取角色列表失败");
      }
      this.roleList = res.result;
    },

    // 监听switch开关状态
    async roleStatusChange(roleInfo) {
      const { data: res } = await this.$http.put("/admin/role/status", {
        id: roleInfo.id,
        enable: roleInfo.enable,
        name: roleInfo.name,
        nameZh: roleInfo.nameZh,
      });
      if (res.code !== 200) {
        roleInfo.enable = !roleInfo.enable;
        return this.$message.error("更新角色状态失败");
      }
      this.$message.success("更新角色状态成功");
    },

    // 添加角色
    async addRole() {
      const { data: res } = await this.$http.post("/admin/role", {
        nameZh: this.addRoleForm.nameZh,
        name: this.addRoleForm.name,
        enable: this.addRoleForm.enable,
        perms: this.addRoleForm.perms,
      });
      if (res.code !== 200) {
        this.$message.error("添加角色失败");
      }
      this.$message.success("添加角色成功");
      // 隐藏添加用户的对话框
      this.addRoleDialogVisible = false;
      // 重新获取用户列表
      this.getRoleList();
    },

    // 监听添加角色对话框的关闭事件
    addRoleDialogClose() {
      this.$refs.addRoleFormRef.resetFields();
    },

    // 监听修改角色对话框的关闭事件
    editRoleDialogClose() {
      this.$refs.editRoleFormRef.resetFields();
    },

    // 展示编辑角色的对话框
    showRoleEditDialog(role) {
      this.editRoleDialogVisible = true;
      this.selectedRole = role;
      let powerIds = [];
      if( role.perms){
        for (let i = 0; i < role.perms.length; i++) {
         powerIds.push(role.perms[i].id);
        }
      }
      this.selectedPowersIds = powerIds;
    },

    // 修改角色信息并提交
    async editRoleInfo(ROLE) {
      let _this = this;
      // 根据视图绑定的角色 id 向后端传送角色信息
      let powers = [];
      for (let i = 0; i < _this.selectedPowersIds.length; i++) {
        for (let j = 0; j < _this.powerList.length; j++) {
          if (_this.selectedPowersIds[i] === _this.powerList[j].id) {
            powers.push(_this.powerList[j]);
          }
        }
      }
      const { data: res } = await this.$http.put("/admin/role", {
        nameZh: ROLE.nameZh,
        name: ROLE.name,
        perms:powers,
        id:ROLE.id
      });
      if (res.code !== 200) {
        return this.$message.error("更新角色信息失败");
      }
      // 关闭对话框
      this.editRoleDialogVisible = false;
      // 刷新用户列表
      this.getRoleList();
      // 提示修改成功
      this.$message.success("更新角色信息成功");
    },

    // 通过idj删除角色
    async removeRoleById(role) {
      // 弹框询问用户是否真的删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消删除，则返回值为字符串cancel
     
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("/admin/role/delete", {
        data: { id: role.id, name: role.name, nameZh: role.nameZh },
      });
      if (res.code !== 200) {
        return this.$message.error("删除角色失败");
      }
      this.$message.success("删除角色成功!");
      this.getRoleList();
    },

    // 获取所有权限
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