import Cropperjs from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
export default function (ctx, inject) {
  inject('cropper', (el, opts = {}) => {
    return new Cropperjs(el, opts)
  })
}
