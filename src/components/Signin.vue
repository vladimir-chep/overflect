<template>
<div>
    <transition-group :name="slide" mode="out-in">
        <div v-if="!slided" class="signin" :key="0">
            <div class="topNav"></div>
            <div class="mainContent">
                <div class="mainContent__visual">

                </div>
                <div class="mainContent__msg">
                    <p class="mainContent__msg__head">OverFlect</p>
                    <p class="mainContent__msg__txt">OverFlect is a tool for monitoring your individual performance in <a href="https://playoverwatch.com/" target="_blank" rel="noopener nofollow">Overwatch</a>’s competetive mode</p>
                </div>
                <div class="mb-3">
                    <div class="u-tac mb-1">
                        <button type="button" class="btn btn-connect" @click.prevent="nextSlide">Connect</button>
                    </div>
                    <div class="u-tac">
                        <a @click="skip" class="link link-continue">Watch without login</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="slided" class="signin" :key="1">
            <div class="topNav">
                <div class="topNav__cell topNav__cell--aside">
                    <a href="" class="backIcon" @click.prevent="backSlide">
                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.75825 9.07203L9.72271 1.94223C10.166 1.48866 10.1573 0.765881 9.70516 0.325481C9.25305 -0.119308 8.53027 -0.103214 8.08841 0.343039L0.32654 8.29218C-0.116786 8.74575 -0.106544 9.47 0.344098 9.90893L8.29324 17.6737C8.51564 17.8903 8.80534 18 9.09357 18C9.39059 18 9.6876 17.883 9.91146 17.6547C10.3548 17.2026 10.3431 16.4798 9.8939 16.0394L2.75825 9.07203Z" fill="white" />
                        </svg>
                    </a>
                </div>
                <div class="topNav__cell topNav__cell--center">Verification</div>
                <div class="topNav__cell topNav__cell--aside"></div>
            </div>
            <div class="mainContent">
                <div class="mainContent__visual">

                </div>
                <div class="mainContent__msg">
                    <p class="mainContent__msg__head">Enter Password</p>
                    <p class="mainContent__msg__txt">Enter your password to get access to edit mode</p>
                </div>
                <form class="mainContent__card">
                    <input class="mainContent__card__input" :class="{'error': alert}" placeholder="Insert here..." type="password" id="password" v-model="password">
                    <transition name="error" mode="out-in">
                        <p class="mainContent__card__error" v-if="alert">{{ error }}</p>
                    </transition>
                    <button type="submit" class="mainContent__card__btn" @click.prevent="userSignIn" :disabled="loading">
                        <Loading v-if="loading" />
                        <span v-if="!loading">Check it</span>
                    </button>
                </form>
            </div>
        </div>
    </transition-group>
</div>
</template>

<script>
import Loading from '@/components/ui/Spinner-loading.vue';

export default {
    components: {
        Loading,
    },
    data() {
        return {
            password: '',
            // password: '321506',
            alert: false,
            slided: false,
        }
    },
    computed: {
        slide() {
            return this.slided ? 'slide-left' : 'slide-right';
        },
        error() {
            return this.$store.state['auth'].error;
        },
        loading() {
            return this.$store.state['auth'].loading;
        },
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated'];
        },
    },
    watch: {
        error(value) {
            if (value) this.alert = true;
        },
        alert(value) {
            if (!value) this.$store.commit('auth/setError', null);
        }
    },
    methods: {
        userSignIn() {
            if (this.password === '') {
                this.$store.commit('auth/setError', 'Insert password plz');
            } else {
                this.$store.dispatch('auth/userSignIn', {
                    password: this.password
                })
            }
        },
        userSignOut() {
            this.$store.dispatch('auth/userSignOut');
        },
        nextSlide() {
            this.slided = true;
        },
        backSlide() {
            this.alert = null;
            this.password = '';
            this.slided = false;
        },
        skip() {
            this.$store.dispatch('auth/continueWithout');
        }
    },
}
</script>

<style lang="scss">
@import '../styles/setup/_variables';

.layout-login {
    color: #fff;
    background: $main;
}

.signin {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: $padding;
}

.topNav {
    display: flex;
    width: 100%;
    max-width: $wrap-width - ($l-px * 2);
    height: 34px;
    justify-content: space-between;
    align-items: center;

    &__cell {
        &--center {
            font-weight: bold;
            font-size: 1.6rem;
            text-align: center;
        }

        &--aside {
            width: 100%;
            max-width: calc(100% / 12 * 2);
        }
    }
}

.backIcon {
    display: block;
    padding: 6px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: .15s background-color ease-in-out;

    >svg {
        display: block;
        margin: auto;
    }

    &:hover {
        background-color: rgba(#fff, .15);
    }
}

.mainContent {
    display: flex;
    justify-content: space-between;
    flex: 1 1 auto;
    width: 100%;
    max-width: $wrap-width - ($l-px * 2);
    flex-direction: column;

    &__visual {
        margin: 0 auto 3rem;
    }

    &__msg {
        margin-bottom: 4rem;
        text-align: center;

        &__head {
            margin-bottom: 2rem;
            font-weight: bold;
            font-size: 2.4rem;
        }

        &__txt {
            font-size: 1.2rem;

            a {
                color: #fff;

                &:hover {
                    color: #eee7ff;
                }
            }
        }
    }

    &__card {
        width: 100%;
        max-width: 476px;
        margin: 0 auto auto;
        padding: $padding-card;
        border-radius: $radius;
        box-shadow: $shadow-card;
        background: #fff;

        &__error {
            color: $error-color;
            text-align: center;
            font-weight: bold;
            margin-bottom: 2rem;
            transition: all .6s;
        }

        &__input {
            display: block;
            width: 100%;
            height: 46px;
            line-height: 1;
            margin-bottom: 2rem;
            padding: 0 20px;
            border-width: 0;
            border-radius: $radius;
            box-shadow: inset 0 0 0 1px #f1f1f1;
            color: #c4c4c4;
            background-color: #f1f1f1;
            font-size: 1.6rem;
            text-align: center;
            transition-property: all;
            transition-duration: 80ms;
            transition-timing-function: ease-in-out;
            outline-style: none;

            -webkit-appearance: none;
            appearance: none;

            &.error {
                box-shadow: inset 0 0 0 1px $error-color;
                color: $error-color;
            }

            &:hover {
                box-shadow: inset 0 0 0 1px $theme;
            }

            &:focus {
                box-shadow: inset 0 0 0 1px $theme;
                background-color: #fff;
            }
        }

        &__btn {
            display: block;
            width: 100%;
            padding: $sps;
            border-radius: $radius;
            color: #fff;
            background: $theme;
            font-weight: bold;
            font-size: 1.8rem;

            &:disabled {
                background: lighten($theme, 30%);
                border-color: transparent;
            }
        }
    }
}

.link-continue {
    color: #fff;
    padding: 1rem;
    display: inline-block;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    position: absolute;
    will-change: transform;
    transition: all .35s;
}

.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.error-enter-active,
.error-leave-active {
    will-change: transform;
    transition: all .6s;
}

.error-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
}

.error-leave-active {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
}
</style>
