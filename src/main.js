import { createApp } from 'vue'

import App from './App.vue'


// primevue
import PrimeVue from 'primevue/config';

// primevue css(필수) -> tailwinds 연동할거면 따로 설정 필요
// primevue css
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primevue/resources/primevue.min.css';

// primevue plugin (따로 등록해야함? prmevue 하나로 다 사용이 아니라 -> 등록할것도 있는거같음 -> 등록하니까 됨 -> 기본 primevue말고 해당 플러그인들은 따로 해야하는게 있나봄)
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';



createApp(App).use(PrimeVue).directive('tooltip', Tooltip).use(ToastService).mount('#app')

