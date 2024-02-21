import userProductModal from './userProductModal.js'
const { createApp } = Vue;
let productModal = null;
const app = createApp({
    data() {
        return {
            apiUrl:'https://ec-course-api.hexschool.io/v2/api/',
            apiPath: 'chinging',
            products: [],
            item: {},
            cart: []
        }
    },
    mounted() {
        this.getProducts()
        productModal = new bootstrap.Modal(document.getElementById('productModal'))
    },
    methods: {
        getProducts(){
            axios.get(`${this.apiUrl}${this.apiPath}/products`)
            .then((res) => {
                this.products = res.data.products
            }).catch((err) => {
                console.log(err.response);
            });
        },
        openModal(product){
            this.item = {...product};
            productModal.show()
        },
        addToCart(item, count){;
            const product = {...item, count}
            axios.post(`${this.apiUrl}${this.apiPath}/cart`,{
                data:{
                    product_id: product.id,
                    qty: product.count
                }
            } )
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err.response);
            });
        },
        getCarts(){
            axios.post(`${this.apiUrl}${this.apiPath}/cart`)
            .then((res) => {
                this.cart = res.data
            }).catch((err) => {
                
            });
        }
    },
    components:{
        userProductModal
    }
});



app.mount('#app');