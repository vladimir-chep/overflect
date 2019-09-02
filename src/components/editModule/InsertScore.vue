<template>
    <input
        type="number"
        class="insertScore"
        :placeholder="placeholderText"
        v-model.number="score"
        >
</template>

<script>
export default {
    props: ['value', 'placeholderText'],
    computed: {
        score: {
            get() {
                return this.value;
            },
            set(score) {
                this.$emit('input', score);
            }
        }
    },
}
</script>

<style lang="scss">
.insertScore {
        display: block;
        width: 100%;
        height: 46px;
        line-height: 1;
        margin-bottom: 2rem;
        padding: 0 20px;
        border-width: 0;
        border-radius: 8px;
        box-shadow: inset 0 0 0 1px #f1f1f1;
        background-color: #f1f1f1;
        font-size: 1.8rem;
        text-align: center;
        transition-property: all;
        transition-duration: 80ms;
        transition-timing-function: ease-in-out;
        outline-style: none;
        appearance: none;
        text-transform: uppercase;
    }
</style>
