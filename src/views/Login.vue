<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 这里是头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div> 
      <!-- 这里是表单区 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" >
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="loginFormReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 这里是登录表单数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这里是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          // message的意思是如果失败的提示信息，trigger的意思是触发条件失去焦点之后
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    loginFormReset() {
      this.$refs.loginFormRef.resetFields();
    },
    //如果点击登录，则显示一下行为
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if(!valid) return;
        const {data : res} = await this.$http.post('login' , this.loginForm);
        console.log(res);
        
        if(res.meta.status !== 200) return this.$message.error('登录失败');
        this.$message.success('登录成功');
        // 1.将登录成功之后的token，保存到sessionStorage中
          // 项目中除了登录之外的其他api接口，必须在登录之后才能访问
          // token只应在当前网站打开期间生效，所以储存在sessionStorage中
        window.sessionStorage.setItem('token',res.data.token)
        //2.通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push('/home');
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container {
    background-color: pink;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box {
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    // 盒子阴影(x，y，阴影范围，阴影颜色)
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #ddd;
    }  
  }
  .btns {
      // 使用弹性伸缩布局
      display: flex;
      // flex-end尾部对齐
      justify-content: flex-end;
    }
  .login_form {
    position: absolute;
    padding: 0 20px;
    width: 100%;
    bottom: 0;
    // 如果在元素上设置了 box-sizing: border-box;
    // 则宽度和高度会包括内边距和边框：
    box-sizing: border-box;
  }
</style>
