<template>
    <!-- <div class="centerItem">
        <div :class="['actionBtn', { 'centralBtn--close': visible }]">
            <router-link v-if="skip" to="/sign-in" class="actionBtn__button">
                <img src="@/assets/images/icon/SignIn.svg" alt="" />
            </router-link>
            <a v-else class="actionBtn__button" @click="toggleEditModule">
                <img src="@/assets/images/icon/Plus.svg" alt="" />
            </a>
        </div>
    </div> -->
    <div class="centerItem">
        <router-link v-if="skip" to="/sign-in" class="actionBtn">
            <img src="@/assets/images/icon/SignIn.svg" alt="" />
        </router-link>
        <a
            v-else
            :class="['actionBtn', { 'is-close': visible }]"
            @click="toggleEditModule"
        >
            <img src="@/assets/images/icon/Plus.svg" alt="" />
        </a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ActionButton',
    data() {
        return {
            visible: false,
        };
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'skip']),
        // visible() {
        //     // return this.$store.state['editModule'].visible;
        //     return false;
        // },
    },
    methods: {
        toggleEditModule() {
            // if (this.skipped) return;
            // this.$store.dispatch('editModule/toggle');
            this.visible = !this.visible;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.centerItem {
    display: flex;
    position: relative;
    max-width: 80px;
    height: 100%;
    flex: 1 1 0;
}

.actionBtn {
    display: flex;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 201;
    width: 56px;
    height: 56px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: $shadow-card;
    background-color: $theme-color;
    transform: translate(-50%, -50%);
    transition: background-color .15s ease-in;

    img {
        width: 24px;
        height: 24px;
        transition: transform .15s ease-in;
    }

    &.is-close {
        background-color: $error-color;

        > img {
            transform: rotate(45deg);
        }
    }
}

</style>