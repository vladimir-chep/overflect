<template>
<div>
    <div class="layout">
        <div>
            <h1>Sign In</h1>
        </div>
        <form @submit.prevent="userSignIn">
            <div class="error" v-if="alert">{{ error }}</div>
            <div>
                <label for="email">Your Email Address</label>
                <input
                    type="text"
                    id="email"
                    v-model="email">
                </div>
                <div>
                <label for="password">Enter Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="password">
            </div>
                <button>Connect</button>
        </form>
        <button @click="continueWithout">Watch without login</button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            alert: false
        }
    },
    computed: {
        error() {
            return this.$store.state.error;
        },
        loading() {
            return this.$store.state.loading;
        },
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated'];
        },
    },
    watch: {
        error(value) {
            if (value) this.alert = true;
        },
        alert(value) {
            if (!value) this.$store.commit('setError', null);
        }
    },
    methods: {
        userSignIn() {
            this.$store.dispatch('auth/userSignIn', {
                email: this.email,
                password: this.password,
            })
        },
        userSignOut() {
            this.$store.dispatch('auth/userSignOut');
        },
        continueWithout(){
            this.$store.dispatch('auth/continueWithout');
        }
    },
}
</script>
