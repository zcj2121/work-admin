import Vue from 'vue'
import 'vant/lib/index.css';
import axios from './fetch.js'

Vue.prototype.$http = axios;

