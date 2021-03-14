import Vue from 'vue'
import Vuex from 'vuex'
import Database from './modules/Database'
import Page from './modules/Page'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        Database: Database,
        Page: Page
    }
})