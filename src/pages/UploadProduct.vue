<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <div class="box">
          <v-text-field label="Title" v-model="product.title" prepend-icon="text_format"></v-text-field>
          <v-text-field label="Price" v-model.number="product.price" prepend-icon="attach_money"></v-text-field>
          <v-text-field label="Description" multi-line v-model="product.short_description" prepend-icon="description"></v-text-field>
        </div>
        <div class="box">
          <img :src="product.thumbnail_url" alt="" v-if="product.thumbnail_url" style="max-width: 100%">
           <v-text-field
              label="Paste image url"
              v-model="product.thumbnail_url"
              :rules="[rules.required, rules.imageUrl]"
              prepend-icon="add_a_photo"
            ></v-text-field>
          <v-progress-circular v-if="loading" :indeterminate="true"></v-progress-circular>
          <v-btn large block class="primary"  dark @click="uploadProduct" > <v-icon left>cloud_upload</v-icon> Upload Product</v-btn>
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
import mapboxgl from 'mapbox-gl'
import { VTextField, VProgressCircular } from 'vuetify'
import { getTokenObject, getUserProfile } from '@/utils/auth'

export default {
  name: 'UploadProduct',
  mounted () {
    /* mapboxgl.accessToken = 'pk.eyJ1Ijoia3VkYXBhcmEiLCJhIjoiY2plcGxmbTJpMm4xODJ3bWc1ZmN0czdjOSJ9.l4WED1JtSL5cef1d80zioQ'
    this.map = new mapboxgl.Map({
      container: 'map-view',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [31.0335, -17.8252], // [30.15, -18.13], // starting position
      zoom: 19, // starting zoom
      minZoom: 8
    }) */
  },
  components: { VTextField, VProgressCircular },
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
      required: (value) => {
        console.log(value)
        return !!value || 'Required.'
      },
      imageUrl: (url) => {
        console.log(url)
        return !!(url.match(/\.(jpeg|jpg|gif|png)$/) != null) || 'Invalid image url.'
      }
    },
    loading: true
  }),
  methods: {
    getCurrentPosition () {
      if (navigator.geolocation) {
        const self = this
        navigator.geolocation.getCurrentPosition(function (position) {
          self.product.location.longitude = position.coords.longitude
          self.product.location.latitude = position.coords.latitude

          const coordinates = [
            position.coords.longitude,
            position.coords.latitude
          ]
          self.map.flyTo({
            center: coordinates
          })

          // create a HTML element for each feature
          var div = document.createElement('div')
          var icon = document.createElement('i')
          icon.className = 'material-icons white--text marker-icon'
          icon.innerHTML = 'location_on'
          div.className = 'marker'
          div.appendChild(icon)
          new mapboxgl.Marker(div)
            .setLngLat(coordinates)
            .addTo(self.map)
        })
      }
    },
    uploadProduct () {
      this.loading = true
      const authHeader = `${getTokenObject().tokenType} ${getTokenObject().accessToken}`
      console.log(this.product)
      this.product.posted_on = new Date()
      this.product.posted_by = getUserProfile().username
      this.$http.post('/products', {
        headers: {
          Authorization: authHeader
        },
        ...this.product
      }).then(response => {
        console.log('success')
        console.log(response)
        this.loading = false
      }).catch(error => {
        console.log('error', JSON.stringify(error))
        this.loading = false
      })
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
.red {
  background: red
}
.pink {
  color: pink
}
.blue{
  background: blue;
  height: 300px
}
#map-view{
  background:#e6e4e0;
  height: 100%;
  width: 100%;
  position: relative;
}
.map-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10
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
</style>
