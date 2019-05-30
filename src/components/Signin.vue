<template>
<div>
    <div class="layout">
        <div>
            <h1>{{ isAuthenticated ? 'Sign Out' : 'Sign In' }}</h1>
        </div>
        <div v-if="!isAuthenticated">
            <form @submit.prevent="userSignIn">
                <div>
                    <div class="error" v-if="alert">{{ error }}</div>
                </div>
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
                        <button class="">Sign In</button>
            </form>
        </div>
        <div v-else>
            <button class="" @click.prevent="userSignOut">Sign Out</button>
        </div>
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
            return this.$store.getters.isAuthenticated;
        },
        // menuItems() {
        //     if (this.isAuthenticated) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
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
            this.$store.dispatch('userSignIn', {
                email: this.email,
                password: this.password,
            })
        },
        userSignOut() {
            this.$store.dispatch('userSignOut');
        }
    },
}
</script>
