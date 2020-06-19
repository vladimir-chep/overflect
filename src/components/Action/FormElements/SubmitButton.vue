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
@import "~@/styles/setup/variables";

.submitButton {
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
    border: 1px solid;
    margin-bottom: 1rem;

    &:disabled {
        background-color: $inactive-color;
    }
}
</style>