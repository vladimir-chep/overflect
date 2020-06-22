<template>
    <div class="notFound">
        <img
            src="@/assets/images/icon/confusedFace.svg"
            alt="Nothing to display"
            class="notFound__icon"
        />
        <p class="notFound__txt">Nothing to display</p>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.notFound {
    padding: 50px $spacing-x;
    text-align: center;

    &__icon {
        width: 34px;
        height: 34px;
        margin: 16px;
    }

    &__txt {
        color: $text-light;
        font-weight: bold;
        font-size: 2.4rem;
    }
}

</style>