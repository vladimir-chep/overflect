<template>
    <transition name="fade" appear>
        <div class="signIn">
            <transition-group :name="slideAnim" mode="out-in">
                <FrontSlide
                    v-if="fronted"
                    :key="0"
                    @slide="changeSlide"
                    class="signIn__slide"
                />
                <Verification
                    v-else
                    :key="1"
                    @slide="changeSlide"
                    class="signIn__slide"
                />
            </transition-group>
        </div>
    </transition>
</template>

<script>
import FrontSlide from '@/components/SignIn/FrontSlide.vue';
import Verification from '@/components/SignIn/Verification.vue';

export default {
    name: 'LayoutSignIn',
    components: {
        FrontSlide,
        Verification,
    },
    data() {
        return {
            fronted: true,
        };
    },
    computed: {
        slideAnim() {
            const direction = this.fronted ? 'right' : 'left';
            return `slideAnim-${direction}`;
        },
    },
    methods: {
        changeSlide(value) {
            this.fronted = value;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/setup/variables";

.signIn {
    position: relative;
    width: $wrapper-width;
    max-width: 100%;
    height: 100%;
    margin: auto;
    color: #fff;
    background: $theme-color;
    overflow: hidden;

    &__slide {
        display: flex;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        flex-direction: column;
        padding: $padding;
    }
}

.slideAnim {
    &-right-enter-active,
    &-right-leave-active,
    &-left-enter-active,
    &-left-leave-active {
        position: absolute;
        will-change: transform;
        transition: all 0.35s;
    }

    &-right-enter,
    &-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    &-left-enter,
    &-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
}
.fade {
    &-enter-active,
    &-leave-active {
        transition: opacity 0.5s;
        will-change: opacity;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
    }
}
</style>