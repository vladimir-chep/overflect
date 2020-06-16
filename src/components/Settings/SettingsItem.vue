<template>
    <div class="menuItem">
        <div class="menuItem__ttl">{{ title }}</div>
        <div class="menuItem__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsItem',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.menuItem {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: $padding;
    border-bottom: 2px solid $hr-color;
    font-weight: bold;
    font-size: 1.6rem;

    &__ttl {
        color: $text-light;
    }

    &__content {
        a {
            color: $theme-color;
            transition: .25s color ease-in-out;

            &:hover {
                color: darken($theme-color, 10%);
            }
        }
    }
}

</style>