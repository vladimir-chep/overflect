<template>
    <ul class="stats">
        <li v-for="(item, index, key) in source" :key="key" class="stats__item">
            <p class="stats__item__score">
                {{ item[1] }}
            </p>
            <p class="stats__item__name">
                {{ item[0] }}
            </p>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ProfileStats',
    props: {
        source: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss">
@import '~@/styles/setup/variables';

.stats {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $spacing-x * 2;

    &__item {
        width: calc(100% / 12 * 4);
        margin-bottom: 28px;
        text-align: center;

        &__score {
            margin: 0 auto 4px;
            color: $theme-color;
            font-weight: bold;
            font-size: 1.8rem;
        }

        &__name {
            margin: auto;
            font-size: 1.4rem;
        }
    }
}

</style>