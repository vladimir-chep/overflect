<template>
    <div class="viewBody">
        <div class="viewBody__wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ViewBody',
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.viewBody {
    position: relative;
    margin: 0 auto 20px;

    &__wrapper {
        position: relative;
        width: 756px;
        max-width: 100%;
        margin: auto;
        box-shadow: $shadow-3-1;
        background: #fff;
    }
}

</style>