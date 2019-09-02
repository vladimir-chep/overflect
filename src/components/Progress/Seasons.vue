<template>
    <div :class="['seasons', disabled]">
        <select
            v-model="selectedSeason"
            name="seasonList"
            id="seasonList"
            :disabled="seasons.length <= 1"
            >
            <option v-for="(season, index, key) in seasons" :key="key" :value="season">
                {{ season === 0 ? 'all' : season }}
            </option>
        </select>
    </div>
</template>
<script>
export default {
    computed: {
        seasons() {
            return this.$store.getters['progress/getSeasons'];
        },
        selectedSeason: {
            get() {
                return this.$store.getters['progress/getSelectedSeason'];
            },
            set(value) {
                this.$store.commit('progress/setSelectedSeason', Number(value));
            },
        },
        disabled(){
            return this.seasons.length <= 1 ? 'disabled' : '';
        },
    },
}
</script>

<style lang="scss">
@import '../../styles/setup/variables';
.seasons{
    position: relative;
    display: inline-block;
    margin: auto;
    background: $theme;
    display: inline-block;
    border-radius: 8px;
    border: none;

    &:before {
        position: absolute;
        content: '▼';
        color: #fff;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1rem;
    }
    &.disabled{
        background: $unactive-color;
        select{
            color: $text-color;
        }
        &:before{
            content: none;
        }
    }
    select{
        font-size: 1.4rem;
        font-weight: bold;
        color: #fff;
        text-transform: capitalize;
        border: none;
        padding: 4px;
        background: transparent;
        position: relative;
    }
}
</style>
