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
        // ...mapGetters('progress', ['currentRole']),
        title() {
            return this.editMode ? 'Edit result' : 'Add result';
        },
    },
    // beforeCreate() {
    //     this.$store.commit('edit/updateRole', this.currentRole);
    // },
};
</script>

<style lang="scss" scoped>
.actionCard {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 8px 8px 0 0;
    padding: 36px;
    padding-bottom: 100px;
    background: #fff;

    &__wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        max-height: calc(100vh - 136px);
        &__ttl {
            font-size: 2.4rem;
            font-weight: bold;
            margin-bottom: 32px;
        }
        &__body {
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;
        }
    }
}

.slideUp {
    &-enter-active,
    &-leave-active {
        transition-timing-function: ease-in-out;
        transition-duration: 0.25s;
        transition-property: opacity, transform;
        will-change: opacity, transform;
    }

    &-enter,
    &-leave-to {
        transform: translateY(100%);
        opacity: 0;
    }
}
</style>