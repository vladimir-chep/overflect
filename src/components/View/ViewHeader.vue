<template>
    <header class="viewHeader">
        <div class="viewHeader__wrapper">
            <h1 class="viewHeader__wrapper__ttl">
                <slot>Header</slot>
            </h1>
        </div>
    </header>
</template>

<script>
export default {
    name: 'ViewHeader',
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';
@import '~@/styles/setup/mixin';

.viewHeader {
    position: relative;
    margin-bottom: 20px;
    box-shadow: $shadow-card;
    background: #fff;

    &__wrapper {
        @include wrapper;
        display: flex;
        height: 59px;
        justify-content: space-between;
        align-items: center;

        &__ttl {
            margin: 0;
            padding: $spacing-x;
            font-weight: bold;
            font-size: 1.8rem;
            width: 100%;
            text-align: center;
        }
    }
}
</style>