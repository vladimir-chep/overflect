<template>
    <div class="info">
        <div v-if="editMode" class="info__item">
            <p class="info__item__label">Creation Date:</p>
            <span class="info__item__input info__item__input--date">{{
                info.created
            }}</span>
        </div>
        <div v-if="editMode" class="info__item">
            <p class="info__item__label">ID:</p>
            <span class="info__item__input info__item__input--number">{{
                info.id
            }}</span>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        editMode() {
            return this.$store.getters['editModule/isEditMode'];
        },
        info() {
            return this.$store.getters['editModule/getInfo'];
        },
        season: {
            get() {
                return this.$store.getters['editModule/getSeason'];
            },
            set(value) {
                this.$store.dispatch('editModule/updateSeason', Number(value));
            },
        },
    },
};
</script>

<style lang="scss">
@import "../../styles/setup/_variables";

.info {
    margin-bottom: 2rem;

    &__item {
        text-align: left;
        display: flex;
        align-items: center;
        line-height: 1;
        font-size: 1.2rem;
        margin-bottom: 4px;

        &__label {
            display: inline-block;
            font-weight: bold;
            text-transform: uppercase;
        }

        &__input {
            margin-left: 10px;
            /* padding: 4px; */
            color: $text-light;
            font-weight: bold;
            border-width: 0;
            border-radius: 8px;
            border: 2px solid transparent;
            text-align: center;

            &--season {
                /* padding-left: 14px; */
                width: 50px;
                color: $text-color;
                background-color: #f1f1f1;
                text-decoration: underline;

                &:focus {
                    border-color: #f1f1f1;
                    background-color: transparent;
                }
            }
        }
    }
}
</style>
