<template>
    <div class="centerItem">
        <router-link v-if="skip" to="/sign-in" class="toggleBtn">
            <img src="@/assets/images/icon/SignIn.svg" alt="" />
        </router-link>
        <a
            v-else
            :class="['toggleBtn', { 'is-close': visible }]"
            @click="toggleActionCard"
        >
            <img src="@/assets/images/icon/Plus.svg" alt="" />
        </a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ToggleButton',
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'skip']),
        ...mapGetters('edit', ['visible']),
    },
    methods: {
        toggleActionCard() {
            this.$store.dispatch('edit/toggle');
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

.toggleBtn {
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
    background: $theme-color;
    transform: translate(-50%, -50%);
    transition: background-color .25s ease-in-out;
    cursor: pointer;

    &:hover,
    &:focus {
        background: darken($theme-color, 5%);
    }

    > img {
        width: 24px;
        height: 24px;
        transition: transform .15s ease-in;
    }

    &.is-close {
        background-color: $error-color;

        &:hover,
        &:focus {
            background: darken($error-color, 5%);
        }

        > img {
            transform: rotate(45deg);
        }
    }
}

</style>