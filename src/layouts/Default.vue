<template>
<div class="outherWrap">
    <router-view/>
    <navigation />
</div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue';

export default {
    components: {
        Navigation,
    },
    mounted() {
        console.log('%cLayout', 'color: white; background: #009688; padding: 2px 4px', 'Default');
    },
}
</script>

<style lang="scss">
</style>
