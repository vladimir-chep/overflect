<template>
    <ul class="roles">
        <li v-for="(role, index, key) in roles" :key="key" class="roles__item">
            <a
                :class="['roleBtn', { 'is-active': selectedRole === role }]"
                @click="switchList(role)"
            >
                <RoleIcon :role="role" class="roleBtn__icon" />
                {{ role }}
            </a>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';
// import { tankRef, damageRef, supportRef } from '@/firebase/config';
import RoleIcon from '@/components/Symbols/Role/RoleIcon.vue';

export default {
    name: 'RoleTabs',
    data() {
        return {
            roles: ['tank', 'damage', 'support'],
        };
    },
    components: {
        RoleIcon,
    },
    computed: {
        ...mapGetters('edit', ['selectedRole']),
    },
    methods: {
        switchList(value) {
            // switch (value) {
            // case 'tank':
            //     this.$store.dispatch('progress/fetchResults', tankRef);
            //     break;
            // case 'damage':
            //     this.$store.dispatch('progress/fetchResults', damageRef);
            //     break;
            // case 'support':
            //     this.$store.dispatch('progress/fetchResults', supportRef);
            //     break;
            // default:
            //     break;
            // }
            this.$store.dispatch('progress/fetchResults', value);
            this.$store.commit('edit/setRole', value);
            this.$store.commit('edit/setSelectedRole', value);
        },
    },
};
</script>
<style lang="scss">
@import "~@/styles/setup/variables";

.roles {
    display: flex;
    align-items: center;
    text-align: center;

    &__item {
        flex: 1 1 0;
    }
}

.roleBtn {
    display: block;
    position: relative;
    padding: 14px 0;
    color: $text-light;
    font-weight: bold;
    font-size: 1.6rem;
    text-transform: capitalize;
    transition: 0.25s all ease-in-out;
    cursor: pointer;

    &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        border-radius: 4px;
        background: $hr-color;
        content: "";
    }

    &.is-active {
        color: $theme-color;

        &:after {
            background: $theme-color;
        }

        svg {
            path,
            rect {
                fill: $theme-color;
            }
        }
    }

    /* &__icon {
        svg {
            width: 11px;
            height: 11px;
            margin-right: 4px;

            path,
            rect {
                fill: $text-light;
            }
        }
    } */
    &__icon {
        width: 11px;
        height: 11px;
        margin-right: 4px;

        path,
        rect {
            fill: $text-light;
        }
    }

    &:hover {
        background: rgba($theme-color, 0.05);
    }
}
</style>