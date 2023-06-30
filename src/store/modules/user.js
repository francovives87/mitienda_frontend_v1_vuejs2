export default {
    namespaced: true,

    state: {
        user_store: [],
        user_location:{}

    },

    mutations: {
        AddUser(state, payload) {
            state.user_store = payload
        },
        AddUserLocation(state,payload){
            state.user_location = payload
        },
        ClearUser(state) {
            state.user_store = []
        }


    },
    actions: {


    },
    getters: {

    }

}