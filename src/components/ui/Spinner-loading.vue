<template>
    <div class="hollow-dots-spinner">
        <!-- :style="spinnerStyle" -->
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
$size: 20px;

.hollow-dots-spinner,
.hollow-dots-spinner * {
    box-sizing: border-box;
}

.hollow-dots-spinner {
    height: $size;
    width: calc(#{$size + $size} * 3);
    margin: auto;

    .dot {
        width: $size;
        height: $size;
        margin: 0 calc(#{$size} / 2);
        border: calc(#{$size} / 5) solid #7b4bff;
        border-radius: 50%;
        float: left;
        transform: scale(0);
        animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;

        &:nth-child(1) {
            animation-delay: calc(0.3s * 1);
        }

        &:nth-child(2) {
            animation-delay: calc(0.3s * 2);
        }

        &:nth-child(3) {
            animation-delay: calc(0.3s * 3);
        }
    }
}

@keyframes hollow-dots-spinner-animation {
    50% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
