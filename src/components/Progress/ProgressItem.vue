<template>
    <li class="progressItem">
        <p :class="['progressItem__plays', winClass]">{{ orderNum }}</p>
        <p class="progressItem__score">{{ source.score }}</p>
        <div class="progressItem__tier">
            <img
                class="progressItem__tier__img"
                :src="source.tier.url"
                :alt="source.tier.name"
            />
        </div>
        <p :class="['progressItem__diff', winClass]">
            <IconCarpet v-if="source.diff !== 0" :win-class="winClass" />
            {{ source.diff }}
        </p>
        <div class="progressItem__details" v-if="!skip">
            <button
                class="progressItem__details__editBtn"
                @click="startEdit(currentRole, source.key)"
                :disabled="editMode"
            >
                <IconEdit />
            </button>
        </div>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';
import { getRef } from '@/firebase/config';
import IconCarpet from '@/components/Symbols/Carpet.vue';
import IconEdit from '@/components/Symbols/Edit.vue';

export default {
    name: 'ProgressItem',
    props: {
        source: {
            type: Object,
            required: true,
        },
        orderNum: {
            type: Number,
            required: true,
        },
    },
    components: {
        IconCarpet,
        IconEdit,
    },
    data() {
        return {
            editMode: false,
        };
    },
    computed: {
        ...mapGetters('auth', ['skip']),
        ...mapGetters('progress', ['currentRole', 'currentResults']),
        winClass() {
            if (this.source.winStatus === 0) return 'is-lose';
            if (this.source.winStatus === 1) return 'is-win';
            if (this.source.winStatus === 2) return 'is-draw';
            return '';
        },
    },
    methods: {
        startEdit(role, key) {
            getRef(role).once('value', snapshot => {
                const snap = snapshot.child(key).val();
                this.$store.dispatch('edit/openEditCard', {key, snap});
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';
@mixin col {
    flex: 1 1 0;
    padding: $spacing-x 0;
    text-align: center;
}

.progressItem {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $hr-color;
    list-style: none;

    &__plays,
    &__score,
    &__tier,
    &__diff,
    &__details {
        @include col;
    }

    &__plays {
        @mixin plays($color) {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 50%;
            background: $color;
            content: '';
        }

        &.is-win:before {
            @include plays($success-color);
        }

        &.is-lose:before {
            @include plays($error-color);
        }

        &.is-draw:before {
            @include plays($neutral-color);
        }
    }

    &__score {
        font-weight: bold;
    }

    &__tier {
        &__img {
            width: 100%;
            max-width: 22px;
            height: auto;
        }
    }

    &__diff {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;

        &.is-win {
            color: $success-color;

            svg > path {
                fill: $success-color;
            }
        }

        &.is-lose {
            color: $error-color;

            svg {
                transform: rotate(180deg);

                path {
                    fill: $error-color;
                }
            }
        }

        &.is-draw {
            color: $neutral-color;

            svg > path {
                fill: $neutral-color;
            }
        }

        > svg {
            width: 8px;
            margin-right: 4px;

            path {
                fill: $neutral-color;
            }
        }
    }

    &__details {
        display: flex;
        justify-content: center;

        &__editBtn {
            display: inline-flex;
            padding: 6px;
            border: none;
            border-radius: 8px;
            background: #f7f7f7;

            svg {
                height: 16px;
            }
        }
    }
}

</style>