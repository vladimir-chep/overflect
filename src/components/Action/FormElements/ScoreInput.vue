<template>
    <input
        type="text"
        pattern="\d*"
        class="scoreInput"
        placeholder="Insert score"
        :value="playScore"
        :maxlength="4"
        @input="updateValue"
        @keypress="checkNumber()"
    />
</template>

<script>
export default {
    name: 'ScoreInput',
    props: {
        playScore: {
            type: String,
            required: true,
        },
    },
    methods: {
        updateValue(event) {
            this.$emit('update-score', event.target.value);
        },
        checkNumber(e) {
            const event = e || window.event;
            const charCode = event.which || event.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                event.preventDefault();
            } else {
                return true;
            }
            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';
@import '~@/styles/setup/mixin';
$bg-color: #f1f1f1;

.scoreInput {
    @include transition-default;
    display: block;
    width: 100%;
    height: 46px;
    line-height: 1;
    margin-bottom: 2rem;
    padding: 0 20px;
    border-width: 0;
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px $bg-color;
    background: $bg-color;
    font-size: 1.6rem;
    text-align: center;
    text-transform: uppercase;
    outline-style: none;

    appearance: none;

    &:hover {
        background: darken($bg-color, 5%);
    }
}

</style>