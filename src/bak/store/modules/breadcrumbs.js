export default {
    namespaced: true,

    state: {
        breadcrumbs: []
    },
    mutations: {
        setSalientsProducts(state, payload) {
            state.salientsProductsState = payload
        },


    },
    actions: {
        filterProduct(state, payload) {
            return state.productoDetalle.filter(product => product.id === payload);
        },
    },
    getters: {
        productoDetalle: state => state.productoDetalle
    }
}