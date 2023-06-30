
import axios from 'axios'
export default {
    namespaced: true,

    state: {
        tienda: [],
        mitienda: [],
        count_objects: [],
        server: '',
        newOrderFlag: false,
        cantNewsNotifications: 0,
        tienda_empty:true,
    },

    mutations: {
        ChangeTiendaEmpty(state,payload){
            if (payload == 'empty') {
                state.tienda_empty = true
            }
            if (payload == 'no_empty') {
                state.tienda_empty = false
            }
        },
        AddTienda(state, payload) {
            state.tienda = payload
        },
        AddMiTienda(state, payload) {
            state.mitienda = payload
        },
        Add_count_objects(state, payload) {
            state.count_objects = payload
        },
        ClearTienda: (state) => {
            state.tienda = []
        },
        ClearMiTienda(state) {
            state.mitienda = []
        },
        ClearCantOrdersNews(state) {
            state.cantNewsNotifications = 0
        },
        SetServer: (state, payload) => {
            state.server = payload
        },
        SwicthMitiendaToTienda(state, payload) {
            state.tienda = state.mitienda
         
        },

        ChangeFlagNewOrder(state, payload) {
            if (payload == 'active') {
                state.newOrderFlag = true
            }
            if (payload == 'desactive') {
                state.newOrderFlag = false
            }
        },
        SetCantNewNotifiacions(state, payload) {
            state.cantNewsNotifications += payload
        },

        AumentarCantNewsNotifications(state, payload) {
            state.cantNewsNotifications++
        },
        DisminuirCantNewsNotifiacionts(state, payload) {
            
            console.log("desde ESTATE");
            console.log(state.cantNewsNotifications);
            if (state.cantNewsNotifications != 0) {
                state.cantNewsNotifications--
            }
        },
        ClearCantNewsNotifiacionts(state) {
            state.cantNewsNotifications = 0
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