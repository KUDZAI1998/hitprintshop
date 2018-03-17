<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <div class="box">
          <v-text-field  solo label="Search" v-model="searchString" append-icon="search" @keyup.enter="searchProducts(searchString)"></v-text-field>
        </div>
        <div class="box">
          <div class="text-center" v-if="!items.length" style="width: 100%; height: 200px; padding: 20px">
            <v-icon class="mt-3 mb-3 grey--text" style="font-size: 60px">hourglass_empty</v-icon>
            <h3 class="mb-3 ml-2 grey--text title" > I couldn't find what wat you're looking for</h3>
            <v-btn large class="primary" @click="$router.push('/timeline')">Browse products <v-icon right>shopping_cart</v-icon> </v-btn>
          </div>
          <v-list three-line v-else>
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
          <!--<v-btn class="white primary--text map-btn" @click="getCurrentPosition"><v-icon left>my_location</v-icon> Get my current location</v-btn>-->
        </div>
      </v-flex>
    </v-layout>
   
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { VTextField, VProgressCircular, VChip, VSubheader, VIcon } from 'vuetify'
import StarRating from 'vue-star-rating'
export default {
  name: 'SearchResults',
  mounted () {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3VkYXBhcmEiLCJhIjoiY2plcGxmbTJpMm4xODJ3bWc1ZmN0czdjOSJ9.l4WED1JtSL5cef1d80zioQ'
    this.map = new mapboxgl.Map({
      container: 'map-view',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [31.0335, -17.8252], // [30.15, -18.13], // starting position
      zoom: 19, // starting zoom
      minZoom: 8
    })
    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl())

    this.searchString = this.searchStringFromQuery
    this.searchProducts(this.searchStringFromQuery)
  },
  components: { VTextField, VProgressCircular, VChip, VSubheader, StarRating, VIcon },
  data: () => ({
    map: {},
    img: '',
    searchString: '',
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
    getCurrentPosition () {},
    searchProducts (searchString) {
      this.$http.post(`/products/search?q=${searchString}`)
        .then(response => {
          console.log(response)
          this.items = response.data.product
          this.populateMapWithResults(response.data.product)
        })
        .catch(error => {
          console.log(error)
        })
    },
    populateMapWithResults (searchResults) {
      // remove any existing markers
      for (let i = 0; i < searchResults.length; i++) {
        if (searchResults[i].location) {
          const coordinates = [
            searchResults[i].location.longitude,
            searchResults[i].location.latitude
          ]

          // create a HTML element for each feature
          var div = document.createElement('div')
          var icon = document.createElement('i')
          icon.className = 'material-icons white--text marker-icon'
          icon.innerHTML = 'location_on'
          div.className = 'marker'
          div.appendChild(icon)
          new mapboxgl.Marker(div)
            .setLngLat(coordinates)
            .addTo(this.map)
        }
      }

      // then fly to the location of the first results
      if (searchResults.length) {
        if (searchResults[0].location) {
          this.map.flyTo({
            center: [
              searchResults[0].location.longitude,
              searchResults[0].location.latitude
            ]
          })
        }
      }
    }
  },
  computed: {
    searchStringFromQuery () {
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
