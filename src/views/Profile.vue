<template>
    <div class="profile">
        <div class="header">
          <img :src="data.icon" alt="Icon">
          <p>{{ data.name }}</p>
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
            <li>Tier: <img class="ratingClass" :src="data.ratingIcon" alt=""></li>
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
    data() {
        return {
            users: [],
            data: {}
        };
    },
    mounted() {
        const url = "https://ow-api.com/v1/stats/pc/asia/Noyt-11939/profile";
        this.$http.get(url).then(result => {
            this.data = result.data;
        });
    },
    methods: {}
};
</script>
<style lang="scss">
.header{
  img {
    width: 100%;
    max-width: 50px;
    border-radius: 50%;
  }
}
.json{
  font-size: .1rem;
}
.ratingClass{
  width: 100%;
    max-width: 30px;
}
</style>
