<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <div class="box">
          <v-text-field  solo label="Search" v-model="product.title" append-icon="search"></v-text-field>
        </div>
        <div class="box">
          <v-list three-line>
            <template class="ma-2" v-for="(item, index) in items" >
              <div class="ma-2" :key="item.title">
                <v-subheader  v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                <v-list-tile avatar v-else :key="item.title" @click="">
                  <v-list-tile-avatar>
                    <img :src="item.thumbnail_url">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title >{{item.title}} <span class="circle-price blue darken-1">${{item.price}}</span></v-list-tile-title>
                    <v-list-tile-sub-title><star-rating v-model="item.ratings" :star-size="16" text-class="white--text" class="ml-2" read-only/> {{item.short_description}}  </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </div>
            </template>
          </v-list>
        </div>
      </v-flex>
      <v-flex xs12 sm8 style="height: 800px;" >
        <div class="box" id="map-view">
          <v-btn outline class="primary primary--text map-btn" @click="getCurrentPosition"><v-icon left>my_location</v-icon> Get my current location</v-btn>
        </div>
      </v-flex>
    </v-layout>
   
  </div>
</template>

<script>
//  import mapboxgl from 'mapbox-gl'
import { VTextField, VProgressCircular, VChip, VSubheader } from 'vuetify'
import StarRating from 'vue-star-rating'
export default {
  name: 'SearchResults',
  mounted () {
    /* mapboxgl.accessToken = 'pk.eyJ1Ijoia3VkYXBhcmEiLCJhIjoiY2plcGxmbTJpMm4xODJ3bWc1ZmN0czdjOSJ9.l4WED1JtSL5cef1d80zioQ'
    this.map = new mapboxgl.Map({
      container: 'map-view',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [31.0335, -17.8252], // [30.15, -18.13], // starting position
      zoom: 19, // starting zoom
      minZoom: 8
    }) */
    this.$http.post(`/products/search?q=${this.searchString}`)
      .then(response => {
        console.log(response)
        this.items = response.data.product
      })
      .catch(error => {
        console.log(error)
      })
  },
  components: { VTextField, VProgressCircular, VChip, VSubheader, StarRating },
  data: () => ({
    map: {},
    img: '',
    product: {
      title: '',
      short_description: '',
      price: 0,
      thumbnail_url: '',
      available: true,
      condition: 'new',
      posted_on: '',
      category: 'technology',
      posted_by: '',
      location: {},
      comments: []
    },
    rules: {
      required: value => {
        console.log(value)
        return !!value || 'Required.'
      },
      imageUrl: url => {
        console.log(url)
        return (
          !!(url.match(/\.(jpeg|jpg|gif|png)$/) != null) || 'Invalid image url.'
        )
      }
    },
    items: [],
    loading: false
  }),
  methods: {
    getCurrentPosition () {}
  },
  computed: {
    searchString () {
      return this.$route.query.q
    }
  }
}
</script>

<style>
@import url('../assets/css/mapbox-gl.css');

.box {
  width: 100%;
  padding: 10px;
}

#map-view {
  background: #e6e4e0;
  height: 100%;
  width: 100%;
  position: relative;
}
.map-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}
.marker {
  background: red;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: #fff 4px solid;
  cursor: pointer;
  position: relative;
}
.marker-icon {
  position: absolute;
  top: 10px;
  left: 10px;
}

.circle-price {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  color: white;
  padding: 10px;
}
</style>
