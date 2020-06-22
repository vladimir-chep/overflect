<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.roleIcon {
    width: 11px;
    margin-right: 4px;

    path,
    rect {
        fill: $text-light;
    }

    &.is-active {
        color: $theme-color;

        path,
        rect {
            fill: $theme-color;
        }
    }
}

</style>