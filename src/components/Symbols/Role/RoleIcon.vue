<template>
    <component :is="role"></component>
</template>
<script>
import Tank from './Tank.vue';
import Damage from './Damage.vue';
import Support from './Support.vue';

export default {
    props: {
        role: {
            type: String,
            required: true,
        },
    },
    components: {
        Tank,
        Damage,
        Support,
    },
};
</script>
