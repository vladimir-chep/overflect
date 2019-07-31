<template>
    <Radios>
        <Radio
            :name="1"
            v-model="wins"
            >
            Win
        </Radio>
        <Radio
            :name="2"
            v-model="wins"
            >
            Draw
        </Radio>
        <Radio
            :name="0"
            v-model="wins"
            >
            Lose
        </Radio>
    </Radios>
</template>

<script>
import Radios from '@/components/editModule/radios/Radios.vue';
import Radio from '@/components/editModule/radios/radio/Radio.vue';

import IconTank from '@/components/icons/competitive/Tank.vue';
import IconDamage from '@/components/icons/competitive/Damage.vue';
import IconSupport from '@/components/icons/competitive/Support.vue';

export default {
    props:{
        value: {
            type: Number,
            required: true
        }
    },
    computed: {
        wins: {
            get() {
                return this.value;
            },
            set(wins) {
                this.$emit('input', wins);
            },
        }
    },
    components:{
        Radios,
        Radio,
        IconTank,
        IconDamage,
        IconSupport,
    },
}
</script>

<style lang="scss">
</style>
