<template>
  <div fluid>
      <div class="hero primary lighten-3">
        <h3 class="text-center headline white--text">Find whatever you need, right here</h3>
        <div>
          <v-text-field
            prepend-icon="search"
            label="Search for goods and services"
            solo
            v-model="searchString"
            @keyup.enter="$router.push(`/search?q=${searchString}`)"
            class="mx-3 my-3"
            flat/>
        </div>

      </div>
      <div class="categories text-center">
          <h3 class="headline white--text mt-5">Promoted  products should coome here</h3>
      </div>

  </div>
</template>

<script>
import {VTextField, VIcon} from 'vuetify'
import * as VCard from 'vuetify/es5/components/VCard'

export default {
  components: {
    VTextField,
    VCard: VCard.VCard,
    VCardTitle: VCard.VCardTitle,
    VCardMedia: VCard.VCardMedia,
    VCardActions: VCard.VCardActions,
    VIcon
  },
  data: () => ({
    colors: [ 'pink', 'green', 'purple', 'brown', 'blue', 'red', 'orange' ],
    searchString: ''
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero {
  height: 400px;
  padding: 100px 30px;
  /* Im thinking thhe background here should be a map with pounts of 
  * interests showing up.
  */
  background-image: url(../assets/connect.jpg);
  background-position: center;
  background-size: cover;
}
.text-center {
  text-align: center
}

.categories {
  margin: -150px auto 10px auto;
  background: rgba(35, 102, 226, 0.363);
  width: 90%;
  height: 300px;
  left: 5%;
  padding: 20px;
  z-index: 100000;
}

</style>
