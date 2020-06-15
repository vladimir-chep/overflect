<script>
export default {
    name: 'NavigationIconWrapper',
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/setup/variables";

.icon {
    width: 24px;
    height: 24px;
    margin: auto;
    &.is-active rect {
        fill: $theme-color;
    }
}
</style>