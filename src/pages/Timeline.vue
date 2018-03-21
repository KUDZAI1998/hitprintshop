<template>
  <div>
    <app-timeline :products="productsData"></app-timeline>
  </div>
</template>

<script>
import AppTimeline from '@/components/AppTimeline'

export default {
  name: 'Timeline',
  components: {
    AppTimeline
  },
  mounted () {
    console.log('mounted')
    this.$http.get('/products')
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
