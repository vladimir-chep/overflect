<template>
    <router-view />
</template>

<script>
export default {
    mounted() {
        console.log('%cLayout', 'color: white; background: #009688; padding: 2px 4px', 'Login');
    },
}
</script>