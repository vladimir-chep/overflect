<template>
    <svg
        viewBox="0 0 8 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="winClass"
    >
        <path
            d="M7.46093 4H0.53906C0.0597662 4 -0.180257 3.48908 0.158649 3.19028L3.61958 0.138917C3.82967 -0.0463058 4.17032 -0.0463058 4.38041 0.138917L7.84134 3.19028C8.18027 3.48908 7.94022 4 7.46093 4Z"
        />
    </svg>
</template>

<script>
export default {
    name: 'Carpet',
    props: {
        winClass: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

svg {
    path {
        fill: none;
    }

    &.is-win {
        path {
            fill: $success-color;
        }
    }

    &.is-lose {
        transform: rotate(180deg);

        path {
            fill: $error-color;
        }
    }

    &.is-draw {
        path {
            fill: $neutral-color;
        }
    }
}

</style>