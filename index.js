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
        this.getCarts()
        productModal = new bootstrap.Modal(document.getElementById('productModal'))
    },
    methods: {
        getProducts(){
            axios.get(`${this.apiUrl}${this.apiPath}/products`)
            .then((res) => {
                console.log(res.data.products[0]);
                this.products.push(res.data.products[0])
                // this.products = res.data.product
            }).catch(() => {
                console.log('商品獲取失敗');
            });
        },
        openModal(product){
            this.item = {...product};
            productModal.show();
        },
        addToCart(item, count){ 
            const product = {...item, count}
            axios.post(`${this.apiUrl}${this.apiPath}/cart`,{
                data:{
                    product_id: product.id,
                    qty: product.count
                }
            } )
            .then(() => {
                this.getCarts()
            }).catch(() => {
                console.log('商品加入購物車失敗');
            });
        },
        getCarts(){
            axios.get(`${this.apiUrl}${this.apiPath}/cart`)
            .then((res) => {
                this.cart = res.data.data
            }).catch(() => {
                console.log('購物車獲取失敗');
            });
        }
    },
    components:{
        userProductModal
    }
});



app.mount('#app');