<template>
    <nav id="nav" class="navigation">
        <div class="navigation__wrapper">
            <div class="navList">
                <router-link to="/profile"
                             class="navList__item">
                    <svg class="navList__item__icon"
                         viewBox="0 0 24 24"
                         fill="none"
                         preserveAspectRatio="xMidYMin slice"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="24"
                              height="24"
                              rx="2"
                              fill="#AFB2BC" />
                        <path d="M12 3.375C14.3516 3.375 16.2581 5.22187 16.2581 7.5C16.2581 9.77813 14.3516 11.625 12 11.625C9.64839 11.625 7.74194 9.77813 7.74194 7.5C7.74194 5.22187 9.64839 3.375 12 3.375Z"
                              fill="white" />
                        <path d="M12 20.25C9.15968 20.25 4.83541 20.1708 4.5 19.5C3.75 18 7.60162 13.5 9.67742 13.5C9.79355 13.5 9.90968 13.5187 10.021 13.5516C10.65 13.7484 11.3081 13.875 12 13.875C12.6919 13.875 13.3548 13.7484 13.979 13.5516C14.0903 13.5187 14.2065 13.5 14.3226 13.5C16.3984 13.5 20.25 18 19.5 19.5C19.1646 20.1708 14.8403 20.25 12 20.25Z"
                              fill="white" />
                    </svg>
                </router-link>
                <router-link to="/progress"
                             class="navList__item">
                    <svg class="navList__item__icon"
                         viewBox="0 0 24 24"
                         fill="none"
                         preserveAspectRatio="xMidYMin slice"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect x="9"
                              width="15"
                              height="6"
                              rx="2"
                              fill="#AFB2BC" />
                        <rect width="6"
                              height="6"
                              rx="2"
                              fill="#AFB2BC" />
                        <rect x="9"
                              y="9"
                              width="15"
                              height="6"
                              rx="2"
                              fill="#AFB2BC" />
                        <rect y="9"
                              width="6"
                              height="6"
                              rx="2"
                              fill="#AFB2BC" />
                        <rect x="9"
                              y="18"
                              width="15"
                              height="6"
                              rx="2"
                              fill="#AFB2BC" />
                        <rect y="18"
                              width="6"
                              height="6"
                              rx="2"
                              fill="#AFB2BC" />
                    </svg>
                </router-link>
                <div class="navList__item navList__item--centralBtn">
                    <div :class="['centralBtn',{'centralBtn--close': visible}]">
                        <router-link to="/signin"
                                     class="centralBtn__button"
                                     v-if="skipped">
                            <IconSignIn />
                        </router-link>
                        <div class="centralBtn__button"
                             v-else
                             @click="toggleEditModule">
                            <IconPluse />
                        </div>
                    </div>
                </div>
                <router-link to="/chart"
                             class="navList__item">
                    <svg class="navList__item__icon"
                         viewBox="0 0 24 24"
                         fill="none"
                         preserveAspectRatio="xMidYMin slice"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect x="1"
                              width="24"
                              height="24"
                              rx="2"
                              fill="#AFB2BC" />
                        <path d="M1 12H6.9307C6.97238 12 7.0097 11.9741 7.02433 11.9351L9.13724 6.30069C9.1717 6.20881 9.30409 6.21635 9.32789 6.31155L12.1699 17.6796C12.1939 17.7756 12.3278 17.7821 12.3611 17.689L15.9026 7.77281C15.9345 7.68332 16.0616 7.68467 16.0916 7.77483L17.4772 11.9316C17.4908 11.9725 17.529 12 17.5721 12H20.5"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round" />
                    </svg>
                </router-link>
                <router-link to="/settings"
                             class="navList__item">
                    <svg class="navList__item__icon"
                         viewBox="0 0 24 24"
                         fill="none"
                         preserveAspectRatio="xMidYMin slice"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="24"
                              height="24"
                              rx="2"
                              fill="#AFB2BC" />
                        <path d="M18.3616 13.1323L19.7977 13.9258C19.9617 14.0164 20.0378 14.2038 19.9816 14.3769C19.6086 15.5266 18.9717 16.5653 18.1388 17.4281C18.0764 17.4926 17.993 17.535 17.9022 17.5482C17.8113 17.5615 17.7185 17.5447 17.639 17.5008L16.204 16.7074C15.6002 17.2026 14.9061 17.5868 14.1566 17.8406V19.4271C14.1566 19.5151 14.1253 19.6005 14.0679 19.6692C14.0104 19.7379 13.9303 19.7858 13.8406 19.8051C12.6627 20.0583 11.3976 20.0714 10.1602 19.8053C9.97523 19.7656 9.84338 19.6087 9.84338 19.4272V17.8406C9.09383 17.5868 8.39971 17.2026 7.79597 16.7074L6.361 17.5008C6.28144 17.5447 6.18862 17.5615 6.0978 17.5482C6.00697 17.535 5.92354 17.4926 5.86121 17.4281C5.02828 16.5653 4.39137 15.5266 4.01834 14.3769C3.96216 14.2038 4.03829 14.0164 4.20229 13.9258L5.63837 13.1323C5.49413 12.3837 5.49413 11.6163 5.63837 10.8678L4.20233 10.0743C4.03832 9.98365 3.9622 9.79626 4.01837 9.62314C4.3914 8.4734 5.02828 7.43469 5.86124 6.57198C5.92358 6.50738 6.00701 6.465 6.09783 6.45179C6.18865 6.43857 6.28147 6.45532 6.36104 6.49927L7.796 7.29266C8.39975 6.79745 9.09387 6.41326 9.84341 6.15943V4.57289C9.84341 4.4849 9.8747 4.39953 9.93213 4.33082C9.98956 4.26212 10.0697 4.21418 10.1594 4.19489C11.3373 3.94167 12.6024 3.92857 13.8398 4.19466C14.0248 4.23444 14.1566 4.39131 14.1566 4.57282V6.1594C14.9062 6.41321 15.6003 6.7974 16.204 7.29262L17.639 6.49924C17.7186 6.45529 17.8114 6.43854 17.9022 6.45175C17.993 6.46497 18.0765 6.50735 18.1388 6.57195C18.9717 7.43466 19.6086 8.47336 19.9817 9.6231C20.0378 9.7962 19.9617 9.98359 19.7977 10.0742L18.3616 10.8677C18.5059 11.6163 18.5059 12.3837 18.3616 13.1323ZM14.6958 12C14.6958 10.577 13.4865 9.41936 12 9.41936C10.5135 9.41936 9.30422 10.577 9.30422 12C9.30422 13.423 10.5135 14.5806 12 14.5806C13.4865 14.5806 14.6958 13.423 14.6958 12Z"
                              fill="white" />
                    </svg>
                </router-link>
            </div>
            <EditModule />
        </div>
    </nav>
</template>

<script>
import EditModule from "@/components/editModule/EditModule.vue";

import IconPluse from '@/components/icons/Pluse.vue';
import IconSignIn from '@/components/icons/SignIn.vue';

export default {
    computed: {
        visible() {
            return this.$store.state['editModule'].visible;
        },
        isAuthenticated() {
            return this.$store.getters["auth/isAuthenticated"];
        },
        skipped() {
            return this.$store.getters["auth/isSkipped"];
        },
    },
    components: {
        EditModule,
        IconPluse,
        IconSignIn,
    },
    methods: {
        toggleEditModule() {
            if (this.skipped) return;
            this.$store.dispatch("editModule/toggle");
        },
    },
};
</script>

<style lang="scss">
@import "../../styles/setup/_variables";

.navigation {
    position: relative;
    max-height: 60px;
    height: 100%;
    text-align: center;
    background: #fff;
    box-shadow: $shadow-navigation;

    &__wrapper {
        position: relative;
        width: 756px;
        max-width: 100%;
        height: 100%;
        margin: auto;
        z-index: 200;
    }
}

.navList {
    display: flex;
    flex-direction: row;
    list-style: none;
    height: 100%;
    align-items: center;
    padding: 0 14px;
    justify-content: space-between;

    &__item {
        $isActive: "#{&}.router-link-exact-active";
        position: relative;
        flex: 1 1 0;
        display: flex;
        height: 100%;
        max-width: 50px;
        &:focus {
            /* background: rgba($theme, .25) ; */
        }

        &#{$isActive}:before {
            content: "";
            display: block;
            background: $theme;
            width: 100%;
            height: 2px;
            position: absolute;
            top: 0;
            left: 0;
        }

        &--editModule {
            max-width: 80px;
        }

        &__icon {
            width: 24px;
            height: 24px;
            margin: auto;

            #{$isActive} & {
                rect {
                    fill: $theme;
                }
            }
        }
    }
}
.centralBtn {
    $parentClass: "#{&}";
    position: absolute;
    top: 0;
    display: block;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $theme;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    box-shadow: $shadow1;
    z-index: 201;
    transition: background-color .15s ease-in;

    &__button {
        width: 100%;
        height: 100%;
        position: relative;
        display: block;
        transition: transform 0.15s ease-in;
    }
    &--close {
        background-color: $error-color;
        #{$parentClass}__button {
            transform: rotate(45deg);
        }
    }
}
</style>
