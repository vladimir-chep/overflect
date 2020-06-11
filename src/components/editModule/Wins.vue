<template>
    <Radios>
        <Radio :name="1" v-model="wins">
            Win
        </Radio>
        <Radio :name="2" v-model="wins">
            Draw
        </Radio>
        <Radio :name="0" v-model="wins">
            Lose
        </Radio>
    </Radios>
</template>

<script>
import Radios from '@/components/editModule/radios/Radios.vue';
import Radio from '@/components/editModule/radios/radio/Radio.vue';

export default {
    computed: {
        wins: {
            get() {
                return this.$store.getters['editModule/getWinStatus'];
            },
            set(value) {
                this.$store.dispatch(
                    'editModule/updateWinStatus',
                    Number(value)
                );
            },
        },
    },
    components: {
        Radios,
        Radio,
    },
};
</script>

<style lang="scss">
</style>
