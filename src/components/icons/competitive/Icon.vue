<template>
    <component :is="iconName"></component>
</template>
<script>
import tank from './Tank.vue';
import damage from './Damage.vue';
import support from './Support.vue';

export default {
    props: ['iconName'],
    components:{
        tank,
        damage,
        support
    },
}
</script>
