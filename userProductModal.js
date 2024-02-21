export default {
    template: '#userProductModal',
    props:['item'],
    data() {
        return {
            numm: 1
        }
    },
    methods: {
        addToCart(){
            
            this.$emit('add', this.item, parseInt(this.numm))
        }
    },

}