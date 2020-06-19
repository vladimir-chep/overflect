<template>
    <button type="submit" class="removeButton" @click="commit">
        <img src="@/assets/images/icon/Remove.svg" alt="Remove">
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'RemoveButton',
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    methods: {
        commit() {
            this.$emit('action');
        },
    },
};
</script>

<style lang="scss">
@import "~@/styles/setup/variables";

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
    > img {
        width: 16px;
        height: 18px;
    }
}
</style>
