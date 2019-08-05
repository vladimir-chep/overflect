<template>
    <div :class="['editModule', {'is-on': visible}]">
        <AddResult
            v-if="!editMode"
            class="editModule__wrapper"
            >
            <p class="editModule__wrapper__ttl">Add result</p>
            </AddResult>
        <EditResult
            v-else
            class="editModule__wrapper"
            >
            <p class="editModule__wrapper__ttl">Edit result</p>
            </EditResult>
    </div>
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
    watch: {
        // visible(value) {
        //     console.log(value);
        //     if (!value) {
        //         this.reset();
        //     }
        // }
    },
    methods: {
        // reset() {
        //     this.role = 'tank';
        //     this.newRank = '';
        //     this.winStatus = 1;
        // },
    },
    components:{
        AddResult,
        EditResult,
    }
};
</script>

<style lang="scss">
@import "../../styles/setup/_variables";

.editModule {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    border-radius: 8px 8px 0 0;
    padding: 36px;
    padding-bottom: 100px;
    background: #fff;
    transform: translateY(100%);
    transition: 0.25s all ease-in-out;
    box-shadow: $shadow2;

    &.is-on {
        transform: translateY(0%);
    }
    &__wrapper{
        display: flex;
        flex-direction: column;
        height: 100%;
        &__ttl {
            font-size: 2.4rem;
            font-weight: bold;
            margin-bottom: 24px;
        }
        &__body {
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;
        }
    }
}
</style>
