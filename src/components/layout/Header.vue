<template>
    <header class="pageHeader">
        <div class="pageHeader__wrapper">
            <div class="pageHeader__wrapper__aside"></div>
            <h1 class="pageHeader__wrapper__ttl">
                <slot name="default">Header</slot>
            </h1>
            <div class="pageHeader__wrapper__aside">
                <slot name="details"></slot>
            </div>
        </div>
    </header>
</template>
<script>
export default {
}
</script>
