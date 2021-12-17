<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->

      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="账号" prop="username"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="出生日期" prop="birth"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="roles[0].nameZh"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeUserById(scope.row)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="重置密码"
              placement="top"
              @click="showResetPasswordDialog(scope.row)"
            >
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="showResetPasswordDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog 
      title="添加用户" 
      :visible.sync="addDialogVisible" 
      width="50%" 
      @close="addDialogClose"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item prop="username" label="账号">
          <el-input
            type="text"
            v-model="addForm.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="addForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="真实姓名">
          <el-input
            type="text"
            v-model="addForm.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            type="text"
            v-model="addForm.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-input
            type="text"
            v-model="addForm.birth"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加编辑用户的对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <el-form :model="editForm" ref="selectedUserRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input> </el-form-item
        ><el-form-item label="出生日期" prop="birth">
          <el-input v-model="editForm.birth"></el-input> </el-form-item
        ><el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色分配" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds" :max="1">
            <el-checkbox
              v-for="(role, i) in roleList"
              :key="i"
              :label="role.id"
              >{{ role.nameZh }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo(selectedUser)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 重置密码的对话框 -->
    <el-dialog
      title="重置密码"
      :visible.sync="resetPasswordDialogVisible"
      width="50%"
      @close="resetPasswordDialogClose"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="resetPasswordForm"
        ref="resetPasswordFormRef"
        label-width="70px"
      >
        <el-form-item prop="username" label="账号" >
          <el-input
            type="text"
            v-model="resetPasswordForm.username"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input
            type="password"
            v-model="resetPasswordForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input
            type="password"
            v-model="resetPasswordForm.confirmPassword"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetPasswordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click=" resetPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pageNum: 1,
        pagesize: 5,
      },
      userlist: [],
      total: 1,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username:'',
        password:'',
        name:'',
        email:'',
        birth:''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {
        username: "",
        name: "",
        email: "",
        birth: "",
        password: "123",
        id: "",
        roles: "",
      },
      editFormRules: {},
      // 被选中的用户
      selectedUser: [],
      // 选中的角色id
      selectedRolesIds: [],
      // 角色列表
      roleList: [],
      // 控制重置密码对话框的显示与隐藏
      resetPasswordDialogVisible: false,
      // 重置密码的表单
      resetPasswordForm: {
        username: "",
        password: "",
        confirmPassword:""
      },
    };
  },
  created() {
    this.getUserList();
    this.getRoleList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("/admin/user", {
        params: {
          size: this.queryInfo.pagesize,
          page: this.queryInfo.pageNum,
        },
      });

      if (res.code !== 200)
        return this.$message.console.error("获取用户列表失败");
      this.userlist = res.result.users;
      this.total = res.result.total;
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },

    // 监听页面值的改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },

    // 监听添加用户对话框的关闭事件
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },

    // 点击按钮添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid=>{
        if (!valid) return
        // 可以发起添加用户请求
        const {data:res} = await this.$http.post('/register',this.addForm)

        if (res.code !== 200) {
          this.$message.error('添加用户失败')
        }
        this.$message.success('添加用户成功')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表
        this.getUserList()
      })
    },

    // 展示编辑用户的对话框
    showEditDialog(user) {
      this.editDialogVisible = true;
      this.selectedUser = user;
      let roleIds = [];
      if (user.roles) {
        for (let i = 0; i < user.roles.length; i++) {
          roleIds.push(user.roles[i].id);
        }
      }

      this.selectedRolesIds = roleIds;
    },

    // 监听修改用户对话框的关闭
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },

    // 修改用户信息并提交
    async editUserInfo() {
      let _this = this;

      let roles = [];
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roleList.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roleList[j].id) {
            roles.push(_this.roleList[j]);
          }
        }
      }
      const { data: res } = await this.$http.put(
        "/admin/user",
        // this.editForm
        {
          username: USER.username,
          name: USER.name,
          birth: USER.birth,
          email: USER.email,
          password: USER.password,
          roles: roles,
        }
      );

      if (res.code !== 200) {
        return this.$message.error("更新用户信息失败");
      }
      // 关闭对话框
      this.editDialogVisible = false;
      // 刷新用户列表
      this.getUserList();
      // 提示修改成功
      this.$message.success("更新用户信息成功");
    },

    // 根据id删除用户
    async removeUserById(User) {
      // 弹框询问用户是否真的删除
      console.log(User)
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
      console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      alert(User.id)

      const {data:res} = await this.$http.delete("/admin/user/delete",{
          data: {
            id: User.id,
            username: User.username,
            password: User.password
          }
      })
      if (res.code !== 200) {
        return this.$message.error('删除用户失败')
      }
      this.$message.success('删除用户成功!')
      this.getUserList()
    },

    // 得到所有角色
    async getRoleList() {
      const { data: res } = await this.$http.get("/admin/role");

      if (res.code !== 200) {
        return this.$message.error("获取角色列表失败");
      }
      this.roleList = res.result;
    },

    // 重置密码对话框的显示
    showResetPasswordDialog(user) {
      this.resetPasswordDialogVisible = true;
      this.resetPasswordForm.username = user.username;
    },

    // 重置密码
    async resetPassword() {
      const {data:res} = await this.$http.put("/admin/user/password",{
        username: this.resetPasswordForm.username,
        password: this.resetPasswordForm.password
      })
       if (res.code !== 200) {
        return this.$message.error("重置密码失败");
      }
      // 关闭对话框
      this.resetPasswordDialogVisible = false;
      // 刷新用户列表
      this.getUserList();
      // 提示修改成功
      this.$message.success("重置密码成功");

    },

    // 监听重置密码对话框的关闭
    resetPasswordDialogClose() {
      this.$refs.resetPasswordFormRef.resetFields();
    },
  }
};
</script>

<style lang="less" scoped>
</style>