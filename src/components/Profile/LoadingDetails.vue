<template>
    <ul class="loading">
        <li class="loading__item" style="width:70%;"></li>
        <li class="loading__item"></li>
        <li class="loading__item" style="margin-bottom: 50px;"></li>
        <li class="loading__item" style="width:50%;"></li>
        <li class="loading__item"></li>
    </ul>
</template>

<script>
export default {
    name: 'LoadingDetails',
};
</script>

<style lang="scss" scoped>
@import "~@/styles/setup/variables";

.loading {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    &__item {
        width: 100%;
        height: 20px;
        margin-bottom: 20px;
        border-radius: 5px;
        color: transparent;
        background: linear-gradient(
            to right,
            rgba($theme-color, 0.2) 8%,
            rgba($theme-color, 0.4) 18%,
            rgba($theme-color, 0.2) 33%
        );
        background-size: 800px 104px;
        animation-name: placeHolderShimmer;
        animation-duration: 1.25s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
    }
}

@keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0;
    }
}
</style>