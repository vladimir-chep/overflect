<template>
<div class="container">
    <router-view />
</div>
</template>

<script>
export default {
    mounted() {
        console.log('%cLayout', 'color: white; background: #009688; padding: 2px 4px', 'Login');
    },
}
</script>

<style lang="scss">
@import "../styles/setup/_variables";
body{
    background: $main;
    color: #fff;
}
</style>
