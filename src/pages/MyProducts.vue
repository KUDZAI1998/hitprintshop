<template>
  <div>
    <h3 class="ml-5 mt-3 headline">My products</h3>
    <app-timeline :products="productsData" isOwner="true"></app-timeline>
  </div>
</template>

<script>
import AppTimeline from '@/components/AppTimeline'
import { getUserProfile } from '@/utils/auth'
export default {
  name: 'Timeline',
  components: {
    AppTimeline
  },
  mounted () {
    console.log('mounted')
    const username = getUserProfile().username
    this.$http.get(`/products?posted_by=${username}`)
      .then(response => {
        this.productsData = response.data
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  data: () => ({
    productsData: []
  })
}
</script>
