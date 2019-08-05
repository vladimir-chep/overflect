<template>
    <div class="info">
        <div
            v-if="editMode"
            class="info__item">
            <p class="info__item__label">ID: <span>{{ value.id }}</span></p>
        </div>
        <div
            v-if="editMode"
            class="info__item">
            <p class="info__item__label">Creation Date: <span>{{ value.created }}</span></p>
        </div>
        <div class="info__item">
            <p class="info__item__label">Season:</p>
            <input
                class="info__item__input info__item__input--season"
                type="number"
                v-model.number="value.season"
                >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    watch: {
        value() {
            this.$emit('input', this.value);
        }
    },
    computed: {
        editMode(){
            return this.$store.state['editModule'].editMode;
        }
    },
    methods: {
    },
}
</script>

<style lang="scss">
.info {
    padding-bottom:  16px;
    &__item{
        text-align: left;
        &__label{
            display: inline-block;
        }
        &__input{
            margin-left: 10px;
            &--season{
                padding-left: 10px;
                width: 46px;
                height: 30px;
                line-height: 1;
                /* background-color: #f1f1f1; */
                font-size: 1.6rem;
                font-weight: bold;
                border-width: 0;
                border-radius: 8px;
                text-decoration: underline;
                &:focus{
                    background-color: #f1f1f1;
                }
            }
        }
    }
}
</style>
