import Vue from 'vue'
import Vuex from 'vuex'

import EventService from '@/services/EventService.js'

// import d'un module ("sous-store")
import * as user from '@/store/user.js'
import * as notification from '@/store/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    notification
  },
  state: {
    //user: { id:'abc123', name: 'Chris' },
    categories: [
      'Nature', 'IT', 'Science'
    ],
    events: [],
    event: {},
    eventsTotal: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    }
  },
  actions: {
    fetchEvents({ commit }, {perPage, page}) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS', response.data)
          //console.log(typeof response.headers['x-total-count']) // string
          commit(
            'SET_EVENTS_TOTAL', 
            parseInt(response.headers['x-total-count'])
          )

        })
        .catch(error => {
          console.log('There was an error: ' + error.response)
        })
    },

    fetchEvent({ commit, getters }, id) {

      // Event déjà dans state ?
      const event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        // event non trouvé dans le state => get api
        EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error: ' + error.response)
        })
      }


    },

    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch(error => {
          console.log('There was an error: ' + error.response)
        })
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
