<template>
    <ul class="loading">
        <li class="loading__logo">
            <span class="loading__logo__img"></span>
        </li>
        <li class="loading__item" style="width:30%; margin-bottom: 7px;"></li>
        <li
            class="loading__item"
            style="width:9%; margin-bottom: 0; height:17px;"
        ></li>
        <li class="loading__item" style="margin: 26px auto 14px;"></li>
    </ul>
</template>

<script>
export default {
    name: 'LoadingHeader',
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.loading {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    &__logo {
        position: relative;
        width: 60px;
        height: 60px;
        overflow: hidden;
        margin-bottom: 14px;
        border-radius: 50%;
        background: linear-gradient(
        135deg,
        rgba($theme-color, .15),
        $theme-color
        );

        &:before {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #fff;
            content: '';
            transform: translate(-50%, -50%);
        }

        &__img {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 2;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 0 5px rgba(#270c50, .25);
            background: linear-gradient(
            to right,
            rgba($theme-color, .2) 8%,
            rgba($theme-color, .4) 18%,
            rgba($theme-color, .2) 33%
            );
            background-size: 800px 104px;
            transform: translate(-50%, -50%);
            animation-name: placeHolderShimmer;
            animation-duration: 1.25s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-fill-mode: forwards;
        }
    }

    &__item {
        width: 100%;
        height: 20px;
        border-radius: 5px;
        color: transparent;
        background: linear-gradient(
        to right,
        rgba($theme-color, .2) 8%,
        rgba($theme-color, .4) 18%,
        rgba($theme-color, .2) 33%
        );
        background-size: 800px 104px;
        animation-name: placeHolderShimmer;
        animation-duration: 1.25s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
    }
}

</style>