export default {
    template: '#userProductModal',
    props:['item'],
    data() {
        return {
            count: 1
        }
    },
    methods: {
        addToCart(){
            
            this.$emit('add', this.item, parseInt(this.count))
        }
    },

}