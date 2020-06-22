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
@import '~@/styles/setup/variables';
@import '~@/styles/setup/mixin';

.removeButton {
    @include transition-default('background-color');
    display: block;
    width: 100%;
    padding: 14px;
    border: 1px solid $text-color;
    border-radius: 8px;
    color: $text-color;
    background: #fff;
    font-weight: bold;
    font-size: 1.8rem;
    text-transform: uppercase;
    cursor: pointer;
    outline-style: none;

    appearance: none;

    &:hover {
        background: rgba($theme-color, .05);
    }

    > img {
        width: 16px;
        height: 18px;
    }
}

</style>
