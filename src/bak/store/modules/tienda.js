
import axios from 'axios'
export default {
    namespaced: true,

    state: {
        tienda: [],
        count_objects: [],
        server: '',
    },
    mutations: {
        AddTienda(state, payload) {
            state.tienda = payload
        },
        Add_count_objects(state, payload) {
            state.count_objects = payload
        },
        ClearTienda: (state) => {
            state.tienda = []
        },
        SetServer: (state, payload) => {
            state.server = payload
        },

    },
    actions: {
        load_count_objects({ commit }) {
            console.log("state")
            let tienda_id = this.state.tienda.tienda.id
            let server = this.state.tienda.server

            console.log("server desde store");
            console.log(server);
            axios
                .get(server + '/api/v1.0/admin/tienda/objects/?tienda=' + tienda_id)
                .then(response => {
                    console.log(response.data);
                    commit('Add_count_objects', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },

    },
    getters: {
        count_objects: state => {
            return state.count_objects;
        }
    }

}