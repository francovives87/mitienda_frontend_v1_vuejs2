export default {
    namespaced: true,

    state: {
        cart: [],
        count: 0,
        total: 0,
        envio:0,
        total_total:0,
    },
    mutations: {
        AddToCartVuex(state, payload) {
            let item = payload;
            item = { ...item, quantity: 1 }
            if (state.cart.length > 0) {
                let bool = state.cart.some(i => i.id == item.id)
                if (bool) {
                    let itemIndex = state.cart.findIndex(el => el.id === item.id)
                    state.cart[itemIndex]["quantity"] += 1;
                } else {
                    state.cart.push(item);
                }
            } else {
                state.cart.push(item)
            }
            state.count++
        },

        AddToCartWithVariationVuex(state, payload) {
            var item = payload;
            item = { ...item, quantity: 1 }

            if (state.cart.length > 0) {
                let bool = state.cart.some(i => i.id == item.id)
                if (bool) {
                    let items_esta = state.cart.filter(i => i.id == item.id)
                    console.log("items esta")
                    console.log(items_esta)
                    let check = items_esta.some(vari => vari.variacion_id == item.variacion_id)
                    if (check) {
                        console.log("ya esta")
                        let itemIndex = state.cart.findIndex(el => el.variacion_id === item.variacion_id)
                        state.cart[itemIndex]["quantity"] += 1;
                    } else {
                        console.log("no esta")
                        state.cart.push(item)
                    }
                } else {
                    state.cart.push(item)
                }
            } else {
                state.cart.push(item)
            }
            state.count++
        },

        RemoveItemVuexWithVariation(state, payload) {
            if (state.cart.length > 0) {
                let bool = state.cart.some(i => i.id === payload.id)
                if (bool) {
                    let index = state.cart.findIndex(el => el.variacion_id === payload.variacion_id)
                    if (state.cart[index]["quantity"] !== 0) {
                        state.cart[index]["quantity"] -= 1
                        state.count--
                    }
                    if (state.cart[index]["quantity"] === 0) {
                        state.cart.splice(index, 1)
                    }

                }
            }
        },



        RemoveItemVuex(state, payload) {
            if (state.cart.length > 0) {
                let bool = state.cart.some(i => i.id === payload.id)
                if (bool) {
                    let index = state.cart.findIndex(el => el.id === payload.id)
                    if (state.cart[index]["quantity"] !== 0) {
                        state.cart[index]["quantity"] -= 1
                        state.count--
                    }
                    if (state.cart[index]["quantity"] === 0) {
                        state.cart.splice(index, 1)
                    }

                }
            }
        },

        AddTotal(state, payload) {
            state.total = payload
        },
        ClearCart: (state) => {
            state.cart.splice(0, state.cart.length);
            state.count = 0;
        },
        AddEnvio(state,payload){
            state.envio = payload
        },
        AddTotalTotal(state,payload){
            state.total_total = payload
        }
        

    },
    actions: {
        
    },
    getters: {

    }
}