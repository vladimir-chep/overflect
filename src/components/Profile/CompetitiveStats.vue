<template>
    <div class="competitive">
        <h3 class="competitive__ttl">Competitive</h3>
        <ul class="competitive__row">
            <li
                class="roleCard"
                v-for="(role, index, key) in ratingsData"
                :key="key"
            >
                <div class="roleCard__visual">
                    <img
                        class="roleCard__visual__icon"
                        :src="
                            require(`@/assets/images/competitive/${role.role}.svg`)
                        "
                        :alt="role.role"
                    />
                </div>
                <p class="roleCard__roleName">{{ role.role }}</p>
                <p class="roleCard__level">{{ role.level }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CompetitiveStats',
    props: {
        ratingsData: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss">
@import '~@/styles/setup/variables';

.competitive {
    &__ttl {
        margin: 0 auto $spacing-x;
        font-weight: bold;
        font-size: 1.8rem;
        text-align: center;
    }

    &__row {
        display: flex;
        margin: 0 -10px;
    }
}

.roleCard {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    align-items: center;
    margin: 0 10px;
    padding: 16px;
    border-radius: 8px;
    box-shadow: $shadow-3-1;
    background: #fff;
    font-weight: bold;

    &__visual {
        margin-bottom: 8px;

        &__icon {
            width: 24px;
            height: 24px;
        }
    }

    &__roleName {
        display: block;
        width: 100%;
        margin-bottom: 8px;
        padding-bottom: 4px;
        border-bottom: 2px solid $bg-color;
        font-size: 1.2rem;
        text-align: center;
        text-transform: capitalize;
    }

    &__level {
        color: $theme-color;
        font-size: 1.6rem;
    }
}

</style>