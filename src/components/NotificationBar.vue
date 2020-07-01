<template>
    <div class="notification-bar">
        <p>{{ notification.message }}</p>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'NotificationBar',
        props: {
            notification: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                timeout: null
            }
        },
        mounted() {
            // démarrer un timer
            this.timeout = setTimeout(() => {
                // commit dans le store
                this.remove(this.notification)
            }, 10000) // 5 secondes
        },
        beforeDestroy() {
            clearTimeout(this.timeout)
        },
        methods: mapActions('notification', ['remove'])
    }
</script>

<style scoped>
.notification-bar {
    background-color: #ddd;
    padding: 2px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
}
</style>