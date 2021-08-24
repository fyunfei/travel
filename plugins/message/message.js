// import Vue from 'vue'
// import { VAlert } from 'vuetify/lib'
import Message from './Message.vue'
const init = (config) => {
  const MessagePlugin = {}
  MessagePlugin.install = (Vue) => {
    const MessageConstuctor = Vue.extend(Message)
    let instance
    Vue.prototype.$message = (opt) => {
      if (instance) {
        instance.show()
      } else {
        instance = new MessageConstuctor({ props: opt, vuetify: config })
        document.querySelector('#app').appendChild(instance.$mount().$el)
        // instance.show()
      }
      return instance
    }
  }
  return MessagePlugin
}
export default init
// Vue.use(VAlertIns)
// let instance
/* class MessageInit {
  constructor(opt) {
    this.create()
  }

  create() {
    // const VAlertIns = new (Vue.extend(VAlert))()
    // VAlertIns.$slots.default = '组件内部设置'
    // VAlertIns.dense = true
    // VAlertIns.type = 'success'

    // Vue.component('VAlert', VAlertIns)
    const Constructor = Vue.extend(Message)
    instance = instance || new Constructor()
    const InstanceEle = instance.$mount().$el
    document.body.appendChild(InstanceEle)
    // InstanceEle.appendChild(VAlertIns.$mount().$el)
  }
} */

// export default MessageInit
