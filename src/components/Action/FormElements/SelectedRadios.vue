<template>
    <div class="selectedRoles">
        <div
            v-for="(role, index, key) in roleList"
            :key="key"
            :class="[
                'selectedRoles__item',
                { 'is-selected': role === editItem.role }
            ]"
        >
            <svg
                class="selectedRoles__item__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <component :is="role"></component>
            </svg>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SelectedRadios',
    props: {
        roleList: {
            type: Array,
            required: true,
        },
    },
    components: {
        Tank: () => import('@/components/Symbols/Role/Tank.vue'),
        Damage: () => import('@/components/Symbols/Role/Damage.vue'),
        Support: () => import('@/components/Symbols/Role/Support.vue'),
    },
    computed: {
        ...mapGetters('edit', ['editItem']),
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.selectedRoles {
    display: flex;
    align-content: center;
    margin: -10px -10px 10px;
    margin-bottom: 20px;

    &__item {
        display: flex;
        width: 100%;
        flex: 1 1 0;
        justify-content: center;
        margin: 10px;
        padding: 14px;
        border-width: 0;
        border-radius: 8px;
        opacity: .5;

        svg {
            width: 20px;
            height: 20px;

            g {
                fill: $text-color;
            }
        }

        &.is-selected {
            background-color: $theme-color;

            svg g {
                fill: #fff;
            }
        }
    }
}

</style>
