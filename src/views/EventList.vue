<template>
  <div>
    <h1>Events Listing </h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    
    <!-- navigation/pagination -->
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list',  query: { page: page - 1 } }">
      Prev</router-link>
    </template>
    <template v-if="hasNextPage">
      <router-link :to="{ name: 'event-list',  query: { page: page + 1 } }">
      Next</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
//import EventService from '@/services/EventService.js'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      //events: []
      perPage: 3
    }
  },
  // created() {
  //   EventService.getEvents()
  //     .then(response => {
  //       this.events = response.data
  //     })
  //     .catch(error => {
  //       console.log('There was an error:', error.response)
  //     })
  // }

  created() {
    this.$store.dispatch('fetchEvents', { perPage: this.perPage, page: this.page })
  },
  computed: {
    ...mapState(['events', 'eventsTotal']),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.page * this.perPage < this.eventsTotal
    }
  }
}
</script>
