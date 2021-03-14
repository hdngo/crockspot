const state = {
    screen: false,
    carousel: false
}

const getters = {
    getScreenActiveState: state => state.screen,
    getCarouselOpenState: state => state.carousel
}

const actions = {
    setScreenState ({ commit }, value) {
        commit('setScreenState', value)
    },
    setCarouselOpenState ({ commit }, value) {
        commit('setCarouselOpenState', value)
    }
}

const mutations = {
    setScreenState (state, value) {
        state.screen = value
    },
    setCarouselOpenState( state, value) {
        state.carousel = value
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}