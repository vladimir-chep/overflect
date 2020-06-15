<template>
    <transition name="fade" appear>
        <div class="view">
            <!-- <div class="view__content">
                <router-view class=""/>
            </div> -->
            <router-view class="view__content"/>
            <Navigation />
        </div>
    </transition>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';

export default {
    name: 'LayoutDefault',
    components: {
        Navigation,
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';
@import '~@/styles/setup/mixin';

.view {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    background: $bg-color;

    &.is-paused > div {
        overflow-y: hidden !important;

        &:after {
            visibility: visible;
            opacity: 1;
        }
    }

    &__content {
        @include height-overflow;
        position: relative;

        &:after {
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            visibility: hidden;
            background: rgba(darken($theme-color, 55%), .5);
            opacity: 0;
            content: '';
            transition: all .35s ease-in-out;
        }
    }
}

.fade {
    &-enter-active,
    &-leave-active {
        transition: opacity 1.5s;
    }

    &-enter,
    &-leave-to {
        opacity: 0;
    }
}

</style>
