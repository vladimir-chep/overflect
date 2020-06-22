<template>
    <transition name="slideUp">
        <div v-if="visible" class="actionCard">
            <div class="actionCard__wrapper">
                <h3 class="actionCard__wrapper__ttl">{{ title }}</h3>
                <EditResult v-if="editMode" class="actionCard__wrapper__body"/>
                <AddResult v-else class="actionCard__wrapper__body"/>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import EditResult from '@/components/Action/EditResult.vue';
import AddResult from '@/components/Action/AddResult.vue';

export default {
    name: 'ActionCard',
    components: {
        AddResult,
        EditResult,
    },
    computed: {
        ...mapGetters('edit', ['visible', 'editMode']),
        title() {
            return this.editMode ? 'Edit result' : 'Add result';
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/mixin';

.actionCard {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 36px;
    padding-bottom: 100px;
    border-radius: 8px 8px 0 0;
    background: #fff;

    &__wrapper {
        display: flex;
        height: 100%;
        max-height: calc(100vh - 136px);
        flex-direction: column;

        &__ttl {
            margin-bottom: 32px;
            font-weight: bold;
            font-size: 2.4rem;
        }

        &__body {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
}

</style>