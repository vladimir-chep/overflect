<template>
    <div class="radioItem">
        <input
            type="radio"
            :id="id"
            :value="inputValue"
            v-model="model"
        />
        <label :for="id">
            <svg
                v-if="icon"
                class="radioItem__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <component :is="icon"></component>
            </svg>
            <span v-else>{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'Radio',
    props: {
        value: {
            type: String,
        },
        inputValue: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
    },
    components: {
        Tank: () => import('@/components/Symbols/Role/Tank.vue'),
        Damage: () => import('@/components/Symbols/Role/Damage.vue'),
        Support: () => import('@/components/Symbols/Role/Support.vue'),
    },
    computed: {
        id() {
            return `radio-${this.inputValue}`;
        },
        model: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>

<style lang="scss">
@import '~@/styles/setup/variables';
@import '~@/styles/setup/mixin';

.radioItem {
    flex: 1 1 0;
    margin: 10px;

    input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    > label {
        @include transition-default('background-color');
        display: flex;
        width: 100%;
        justify-content: center;
        padding: 14px;
        border-width: 0;
        border-radius: 8px;
        background-color: $inactive-color;
        font-weight: bold;
        font-size: 1.6rem;
        text-transform: uppercase;
        cursor: pointer;
        outline-style: none;

        appearance: none;

        &:hover {
            background: darken($inactive-color, 5%);
        }

        > svg {
            width: 20px;
            height: 20px;

            g {
                fill: $text-color;
            }
        }
    }

    > input:checked + label {
        color: #fff;
        background-color: $theme-color;

        &:hover {
            background: darken($theme-color, 5%);
        }

        svg {
            g {
                fill: #fff;
            }
        }
    }
}

</style>
