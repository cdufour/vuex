// Bonne pratique, namespaced=true pour éviter
// collision de noms (exemple: différents modules 
// ayant des noms d'action identiques)
export const namespaced = true

export const state = {
    notifications: []
}

export const mutations = {
    PUSH(state, notification) {
        state.notifications.push(notification)
    },
    DELETE(state, notificationToRemove) {
        state.notifications = state.notifications
            .filter(notification => notification.id !== notificationToRemove.id)
    }
}

export const actions = {
    addNotification({ commit }, notification) {
        commit('PUSH', notification)
    },
    remove({ commit }, notificationToRemove) {
        commit('DELETE', notificationToRemove)
    }
}

export const getters = {}