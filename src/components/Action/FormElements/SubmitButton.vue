<template>
    <button
        type="submit"
        class="submitButton"
        :disabled="inactive"
        @click="commit"
    >
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'SubmitButton',
    props: {
        text: {
            type: String,
            required: true,
        },
        inactive: {
            type: Boolean,
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

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

@import '~@/styles/setup/mixin';

.submitButton {
    @include transition-default('background-color');
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 15px;
    border: 1px solid;
    border-radius: 8px;
    color: #fff;
    background: $success-color;
    font-weight: bold;
    font-size: 1.8rem;
    text-transform: uppercase;
    cursor: pointer;
    outline-style: none;

    appearance: none;

    &:hover {
        background: darken($success-color, 5%);
    }

    &:disabled {
        background-color: $inactive-color;
    }
}

</style>