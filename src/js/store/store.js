import Vue from 'vue'
import Vuex from 'vuex'
import Database from './modules/Database';

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        Database: Database
    }
})