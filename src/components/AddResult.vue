<template>
<div class="addResult">
    <div class="button" :class="{'is-on':show}" @click="show = !show">+</div>
    <div class="block" :class="{'is-on':show}">
        <p>Add Result</p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio tenetur blanditiis alias quibusdam qui ducimus libero doloribus laudantium, excepturi rerum fugit nihil sit ipsum iure facere praesentium ullam ut fugiat?
        </p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
}
</script>

<style lang="scss" scoped>
.button {
    position: absolute;
    top: -50%;
    left: 50%;
    z-index: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background: #7b4bff;
    font-size: 40px;
    transition: .25s all ease-in-out;
    cursor: pointer;

    &.is-on {
        transform: rotate(45deg);
    }

    &:hover {
        background: lighten($color: #7b4bff, $amount: 10%);
    }
}

.block {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    padding-bottom: 100px;
    border: 1px solid;
    border-radius: 8px;
    background: #fff;
    transform: translateY(100%);
    transition: .25s all ease-in-out;

    &.is-on {
        transform: translateY(0%);
    }
}
</style>
