
import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import lang from 'quasar/lang/pt-BR.js'
import {
  ClosePopup,
  QDialog,
  Notify,
  Dialog,
  Loading,
  QSpinnerGears,
  LoadingBar,
  Ripple,
  QSpinnerHourglass
} from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  directives: {
    ClosePopup,
    Ripple
  },
  plugins: {
    Dialog,
    QDialog,
    Notify,
    Loading,
    QSpinnerGears,
    LoadingBar,
    QSpinnerHourglass
  },
  animations: 'all',
  config: {
    notify: { /* Notify defaults */ },
    loading: { /* Loading defaults */ },
    brand: {
      primary: '#4caf50',
      secondary: '#26A69A',
      accent: '#9C27B0',

      dark: '#1d1d1d',

      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  },
  lang: lang
}

Loading.setDefaults({
  message: 'Carregando...',
  spinner: QSpinnerGears,
  spinnerColor: 'primary'

})
LoadingBar.setDefaults({
  color: 'primary',
  size: '10px',
  position: 'bottom'
})