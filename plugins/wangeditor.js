import Vue from 'vue'
import Wangeditor from 'wangeditor'

Vue.prototype.$wangeditor = (toolbarEle, articleEle) => {
  return new Wangeditor(toolbarEle, articleEle)
}
