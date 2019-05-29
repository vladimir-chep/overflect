<template>
<div>
    <div class="layout">
        <div>
            <h1>Sign In</h1>
        </div>
        <div>
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
                <button class="btn btn-primary">Sign In</button>
            </form>
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
            return this.$store.state.error
        },
        loading() {
            return this.$store.state.loading
        }
    },
    watch: {
        error(value) {
            if (value) {
                this.alert = true
            }
        },
        alert(value) {
            if (!value) {
                this.$store.commit('setError', null)
            }
        }
    },
    methods: {
        userSignIn() {
            this.$store.dispatch('userSignIn', {
                email: this.email,
                password: this.password
            })
        }
    },
}
</script>
