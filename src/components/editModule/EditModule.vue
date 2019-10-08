<template>
    <transition name="slide-fade">
    <div v-if="visible" class="editModule">
        <AddResult
            v-if="!editMode"
            class="editModule__wrapper"
            ttl="Add result"
            />
        <EditResult
            v-else
            class="editModule__wrapper"
            ttl="Edit result"
            />
    </div>
    </transition>
</template>

<script>
import AddResult from '@/components/AddResult.vue';
import EditResult from '@/components/EditResult.vue';

export default {
    computed: {
        editMode() {
            return this.$store.state['editModule'].editMode;
        },
        visible() {
            return this.$store.state['editModule'].visible;
        },
    },
    components:{
        AddResult,
        EditResult,
    }
};
</script>

<style lang="scss">
@import "../../styles/setup/_variables";

.slide-fade-enter-active {
  transition: all .25s ease-in-out;
}

.slide-fade-leave-active {
  transition: all .25s ease-in-out;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.editModule {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 8px 8px 0 0;
    padding: 36px;
    padding-bottom: 100px;
    background: #fff;

    &__wrapper{
        display: flex;
        flex-direction: column;
        height: 100%;
        &__ttl {
            font-size: 2.4rem;
            font-weight: bold;
            margin-bottom: 12px;
        }
        &__body {
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;
        }
    }
}
</style>
