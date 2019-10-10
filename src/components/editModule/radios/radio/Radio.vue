<template>
    <div class="radioItem">
        <input
            type="radio"
            :name="name"
            :id="name"
            :value="name"
            v-model="radio"
            >
        <label
            :for="name"
            >
            <slot></slot>
        </label>
    </div>
</template>

<script>

export default {
    props: ['value','name'],
    computed: {
        radio: {
            get() {
                return this.value;
            },
            set(radio) {
                this.$emit('input', radio);
            },
        },
    },
}
</script>

<style lang="scss">
@import "../../../../styles/setup/_variables";

.radioItem {
    flex: 1 1 0;
    margin: 10px;

    input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    label {
        display: flex;
        width: 100%;
        justify-content: center;
        padding: 14px;
        border-width: 0;
        border-radius: 8px;
        background-color: $unactive-color;
        font-weight: bold;
        font-size: 1.6rem;
        text-transform: uppercase;
        outline-style: none;

        appearance: none;

        svg {
            max-height: 20px;
            path {
                fill: $text-color;
            }
        }
    }

    input:checked + label {
        color: #fff;
        background-color: $theme;

        svg {
            path,
            rect {
                fill: #fff;
            }
        }
    }
}

</style>
