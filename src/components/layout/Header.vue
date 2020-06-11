<template>
    <header class="pageHeader">
        <div class="pageHeader__wrapper">
            <div class="pageHeader__wrapper__aside"></div>
            <h1 class="pageHeader__wrapper__ttl">
                <slot name="default">Header</slot>
            </h1>
            <div class="pageHeader__wrapper__aside">
                <slot name="details"></slot>
            </div>
        </div>
    </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../../styles/views/settings.scss";

.pageHeader {
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
            padding: $l-py 0;
            font-weight: bold;
            font-size: 1.8rem;
        }

        &__aside {
            width: 100%;
            max-width: calc(100% / 12 * 2);
        }
    }
}
</style>
