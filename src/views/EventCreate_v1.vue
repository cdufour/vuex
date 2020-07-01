<template>
  <div>
    <h1>Create Event, {{ $store.state.user.name }}</h1>
    <p>Event created by <span>{{ user.name }}</span></p>
    <p>There are {{ catLen }} categories </p>
    <p>{{ getEvent(2) }}</p>
    <ul>
      <li 
        v-for="cat in categories" 
        :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  // computed: {
  //   userName() {
  //     return this.$store.state.user.name
  //   }
  // }

  // computed: mapState({
  //   userName: state => state.user.name,
  //   categories: state => state.categories
  // })

  //computed: mapState(['categories', 'user'])

  computed: {
    localComputed() {
      return null
    },
    ...mapState(['categories', 'user']), // spread operator ES6
    // catLength() {
    //   return this.$store.getters.catLength
    // },
    // getEvent() {
    //   return this.$store.getters.getEventById
    // }
    ...mapGetters({
      getEvent: 'getEventById',
      catLen: 'catLength'
    })
  }

}
</script>