import userProductModal from './userProductModal.js'
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});
const { createApp } = Vue;
let productModal = null;
const app = createApp({
    data() {
        return {
            apiUrl:'https://ec-course-api.hexschool.io/v2/api/',
            apiPath: 'chinging',
            products: [],
            item: {},
            cart: [],
            loading:false
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
                this.products.push(res.data.products[0])
                // this.products = res.data.products
            }).catch(() => {
                console.log('商品獲取失敗');
            });
        },
        openModal(product){
            this.loading = true
            this.item = {...product};
            setTimeout(() => {
                productModal.show();
                this.loading = false
            }, 500);
        },
        addToCart(item, count){ 
            this.loading = true
            const product = {...item, count}
            axios.post(`${this.apiUrl}${this.apiPath}/cart`,{
                data:{
                    product_id: product.id,
                    qty: product.count
                }
            } )
            .then(() => {
                alert('商品新增成功')
                productModal.hide()
                this.getCarts()
                this.loading = false
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
        },
        delCart(){
            axios.delete(`${this.apiUrl}${this.apiPath}/carts`)
            .then(() => {
                alert('購物車已清空')
                this.getCarts()
            }).catch(() => {
                console.log('清空購物車失敗');
            });
        },
        delProduct(id, name){
            this.loading = true
            axios.delete(`${this.apiUrl}${this.apiPath}/cart/${id}`)
            .then(() => {
                alert(`${name}刪除成功`)
                this.loading = false
                this.getCarts()
            }).catch(() => {
                console.log('產品刪除失敗');
            });
        }
    },
    components:{
        userProductModal,
        vForm: Form,
        errorMessage:ErrorMessage,
        vField: Field
    }
});



app.mount('#app');