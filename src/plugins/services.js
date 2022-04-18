
import services from '@/services'

export default {
  install: (app) => {
    app.config.globalProperties.$services =  services
  }
}
