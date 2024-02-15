const { createApp } = Vue;
let productModal = null;
const app = createApp({
    data() {
        return {
            apiUrl:'https://ec-course-api.hexschool.io/v2/api/',
            apiPath: 'chinging',
            products: [],
            item: {}          
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
                console.log(this.products);
            }).catch((err) => {
                console.log(err.response);
            });
        },
        openModal(product){
            this.item = {...product};
            productModal.show()
        }
    },
});

app.component('userProductModal', {
    template: '#userProductModal',
    props:['item']
})


app.mount('#app');