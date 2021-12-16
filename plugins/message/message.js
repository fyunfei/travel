import Message from './Message.vue'
const init = (config) => {
  const MessagePlugin = {}
  MessagePlugin.install = (Vue) => {
    const MessageConstuctor = Vue.extend(Message)
    const instanceList = []
    let instance, instanceEle, timeout
    Vue.prototype.$message = (opt) => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      if (instance) {
        instance.init(opt)
      } else {
        instance = new MessageConstuctor({ data: opt, vuetify: config })
        instanceEle = instance.$mount().$el
        document.querySelector('#app').appendChild(instanceEle)
      }
      instanceList.push({
        instance,
        instanceEle,
      })
      instance.show()
      timeout = setTimeout(() => {
        instanceList.forEach((i) => {
          i.instance.hidden()
        })
        instanceList.pop()
      }, opt.duration || 1500)
      return instance
    }
  }
  return MessagePlugin
}
export default init
