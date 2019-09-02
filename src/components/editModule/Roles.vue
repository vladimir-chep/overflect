<template>
    <Radios>
        <Radio
            name="tank"
            v-model="role"
            >
            <IconTank />
        </Radio>
        <Radio
            name="damage"
            v-model="role"
            >
            <IconDamage />
        </Radio>
        <Radio
            name="support"
            v-model="role"
            >
            <IconSupport />
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
    computed: {
        role: {
            get () {
                return this.$store.getters['editModule/getRole'];
            },
            set (value) {
                console.log(value);

                this.$store.dispatch('editModule/updateRole', value);
            }
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
