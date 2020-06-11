<template>
    <button type="submit" class="removeButton" @click="commit">
        <Remove />
        {{ text }}
    </button>
</template>

<script>
import Remove from '../icons/Remove.vue';
export default {
    props: ['text'],
    components: {
        Remove,
    },
    methods: {
        commit() {
            this.$emit('action');
        },
    },
};
</script>

<style lang="scss">
@import "../../styles/setup/_variables";

.removeButton {
    display: block;
    width: 100%;
    padding: 14px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.8rem;
    outline-style: none;
    appearance: none;
    text-transform: uppercase;
    color: $text-color;
    background-color: #fff;
    border: 1px solid $text-color;
}
</style>
