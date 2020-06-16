<template>
    <div>
        <div class="frontVisual">
            <h1 class="frontVisual__ttl">
                OverFlect
            </h1>
            <p class="frontVisual__txt">
                OverFlect is a tool for monitoring your individual performance
                in
                <a
                    href="https://playoverwatch.com/"
                    target="_blank"
                    rel="noopener nofollow"
                    >Overwatch</a
                >’s competitive mode
            </p>
        </div>
        <div class="control">
            <button
                type="button"
                class="control__connect"
                @click.prevent="nextSlide"
            >
                Connect
            </button>
            <a @click="skip" class="control__skip">Watch without sign in</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FrontSlide',
    methods: {
        nextSlide() {
            this.$emit('slide', false);
        },
        skip(event) {
            event.preventDefault();
            this.$store.dispatch('auth/skipSignIn');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.frontVisual {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
    text-align: center;

    &__ttl {
        margin-bottom: 2rem;
        font-weight: bold;
        font-size: 3rem;
    }

    &__txt {
        line-height: 1.75;
        font-size: 1.6rem;

        a {
            color: #fff;

            &:hover {
                color: #fff;
            }
        }
    }
}

.control {
    text-align: center;
    margin-bottom: 3rem;

    &__connect {
        display: block;
        width: 100%;
        max-width: 380px;
        margin: 0 auto 1rem;
        padding: $spacing-x;
        border: none;
        border-radius: $border-radius;
        color: $theme-color;
        background-color: #fff;
        font-weight: bold;
        font-size: 1.8rem;
        text-transform: uppercase;
        transition: .25s background-color ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: #eee7ff;
        }
    }

    &__skip {
        display: inline-block;
        padding: 1rem;
        color: #fff;
        font-size: 1.4rem;
        text-decoration: underline;
        transition: .25s color ease-in-out;
        cursor: pointer;

        &:hover {
            color: #eee7ff;
        }
    }
}
</style>