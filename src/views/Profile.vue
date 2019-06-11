<template>
<div class="profile">
    <h1>This is a profile page</h1>
    <div class="header">
        <!-- <img :src="data.icon" alt="Icon"> -->
        <!-- <p>{{ data.name }}</p> -->
        <ul class="">
            <li>{{ data.level }}</li>
            <li>{{ data.prestige }}</li>
            <li>{{ data.rating }}</li>
        </ul>
    </div>
    <div class="body">
        <h3>Current Stats</h3>
        <ul>
            <li>Level: {{ data.level }}</li>
            <li>Rating: {{ data.rating }}</li>
            <li>Prestige: {{ data.prestige }}</li>
            <!-- <li>Tier: <img class="ratingClass" :src="data.ratingIcon" alt=""></li> -->
            <li>Winrate: ...</li>
            <li>Number of plays: ...</li>
            <li>Higheast raiting of season: ...</li>
            <li>Lowest raiting of season: ...</li>
        </ul>
    </div>
    <p class="json">{{ data }}</p>
</div>
</template>

<script>
export default {
    name: "profile",
    created() {
        if (!this.$store.state['profile'].isFilled) {
          this.$store.dispatch('profile/getData');
        }
    },
    computed: {
        data() {
            return this.$store.state['profile'].data;
        },
    },
};
</script>

<style lang="scss">
.header {
    img {
        width: 100%;
        max-width: 50px;
        border-radius: 50%;
    }
}

.json {
    font-size: .1rem;
}

.ratingClass {
    width: 100%;
    max-width: 30px;
}
</style>
