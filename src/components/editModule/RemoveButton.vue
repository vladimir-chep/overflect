<template>
    <button
        type="submit"
        class="removeButton"
        @click="commit"
        >
        <Remove />
        {{ text }}
    </button>
</template>

<script>
import Remove from '../icons/Remove.vue';
export default {
    props: ['text'],
    components:{
        Remove,
    },
    methods: {
        commit(){
            this.$emit('action');
        }
    },
}
</script>

<style lang="scss">
@import "../../styles/setup/_variables";

.removeButton {
    background: $success-color;
    display: block;
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 1.8rem;
    outline-style: none;
    appearance: none;
    text-transform: uppercase;
    border-width: 0;
    margin-bottom: 20px;
    background-color: $unactive-color;
    background-color: $text-light;
    background-color: $text-color;
}
</style>
