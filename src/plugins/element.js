import Vue from 'vue'
// 1.导入弹框提示组件
import { Message,Button,Form,FormItem,Input } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//2. Message需要全局挂载
Vue.prototype.$message = Message
