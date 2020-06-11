<template>
    <div class="radioRow">
        <slot></slot>
    </div>
</template>

<style lang="scss">
@import "../../../styles/setup/_variables";

.radioRow {
    margin-bottom: 20px;
    display: flex;
    align-content: center;
    margin: -10px -10px 10px;
}
</style>
