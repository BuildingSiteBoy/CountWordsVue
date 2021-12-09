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
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
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
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
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
        <el-button type="primary" @click="addUser"
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
      queryInfo: {
        query: "",
        pageNum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 6,
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
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("/admin/user", {
        params: this.queryInfo,
      });
      // console.log(res)
      if (res.code !== 200)
        return this.$message.console.error("获取用户列表失败");
      this.userlist = res.result;
      this.total = res.total;
      console.log(this.userlist);
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList;
    },
    // 监听页面值的改变
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNum = newPage;
      this.getUserList;
    },
    // 监听添加用户对话框的关闭事件
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮添加新用户
    addUser(){
      this.$refs.addFormRef.validate(async valid=>{
        if (!valid) return
        // 可以发起添加用户请求
        const {data:res} = await this.$http.post('/register',this.addForm)
        console.log(res)
        if (res.code !== 200) {
          this.$message.error('添加用户失败')
        }
        this.$message.success('添加用户成功')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表
        this.getUserList()
      
      })

    }

  }
};
</script>

<style lang="less" scoped>
</style>