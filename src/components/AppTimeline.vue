<template>
  <v-container fluid grid-list-md class="layout-padding" >
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 xl3 v-for="good in goods" :key="good.id">
        <v-card class="elevation-1 zoom-on-hover">
          <v-card-media
            height="200px"
            :src="good.thumbnail_url" alt="" class="media"> 
            <div class="media-title-tile">
             <v-btn
               flat class="condition-chip white--text"> {{good.title}} <v-icon right>arrow_forward</v-icon></v-btn>
            </div>
          </v-card-media>

          <v-card-title>
            <div>
              <h3 class="headline" style="font-weight: bold">${{good.price}}</h3>
              <star-rating v-model="good.ratings" :star-size="16" text-class="white--text" class="ml-2" read-only/>
            </div>
            <v-spacer></v-spacer>
            <div>
              <span>Posted by <a class="profile-link primary--text"  :href="`/sellers/${good.posted_by}`">{{ good.posted_by }}</a></span>
              <br>
              <span style="color: gray">3 days ago</span> <!-- install momentjs and format the date -->
            </div> 
          </v-card-title>
          <p class="ma-3">
          {{ good.short_description}}
          </p>
          
          <v-card-actions>
            <v-layout row wrap style="padding: 5px">
              <v-btn  flat>
              <v-icon v-if="Math.random() > 0.5" class="red--text">favorite</v-icon>
              <v-icon v-else>favorite_outline</v-icon> {{good.likes_count | normalise}}</v-btn>
            <v-btn  flat> <v-icon>comments</v-icon> {{ good.comments.length }}</v-btn>
            <v-btn v-if="isOwner"  flat class="grey lighten-4"> <v-icon left>edit</v-icon> edit </v-btn>
            </v-layout>  
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>  
</template>

<script>
import {
  VTextField,
  VIcon,
  VChip
} from 'vuetify'

import * as VCard from 'vuetify/es5/components/VCard'
import StarRating from 'vue-star-rating'
export default {
  name: 'AppTimeline',
  components: {
    VCard: VCard.VCard,
    VCardTitle: VCard.VCardTitle,
    VCardMedia: VCard.VCardMedia,
    VCardActions: VCard.VCardActions,
    VTextField,
    VIcon,
    VChip,
    StarRating
  },
  props: {
    isOwner: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$http.get('/products')
      .then(response => {
        this.goods = response.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  data () {
    return {
      goods: []
      /* goods: [
        {
          id: 1,
          title: 'Dell xps 13',
          short_description: 'The best on campus!',
          price: 1.2,
          thumbnail_url: () => `https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`,
          ratings: 3.5,
          available: true,
          condition: 'new',
          likes_count: 1250000000,
          posted_on: new Date(),
          category: 'technology',
          posted_by: '@woody',
          comments: [
            {
              username: '@kp',
              date_comment: new Date(),
              comment: 'I definitely love this concept'
            }
          ]
        }
      ] */
    }
  },
  filters: {
    /** Return a stringified version of a very large number
     * e.g 1000 => 1k, 1000000 => 1M, 1000000000 => 1B
     */
    normalise (value) {
      const billion = 1000000000
      const million = 1000000
      const thousand = 1000

      if (value >= billion) return `${value / billion}B`
      if (value >= million) return `${value / million}M`
      if (value >= thousand) return `${value / thousand}K`

      // If too small just return the value
      return value
    }
  }
}
</script>

<style scoped>
  .layout-padding {
    padding: 40px;
  }
  .zoom-on-hover:hover{
    transform: scale(1, 1.01)
  }
  /* show a background while the images are loadng */
  .media {
    background: #466368;
    background: -webkit-linear-gradient(#648880, #293f50);
    background: -moz-linear-gradient(#648880, #293f50);
    background: -o-linear-gradient(#648880, #293f50);
    background: linear-gradient(#648880, #293f50);
  }

  /* a transparent bacground and increase the font size && weight */
  .media-title-tile {
    background-color: #b2b2b2;
    background-color: rgba(0, 0, 0, .3);
    width: 100%;
    padding: 10px;
    margin-top: 150px; /* the height of the card-media - 35 */
    position: relative;
  }

  .media-title {
    font-weight: bolder;
    font-size: 16px;
    color: snow;
    position: absolute;
    left: 15px;
    bottom: 13px;
  }

  .condition-chip {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }

  .profile-link {
    text-decoration-line: none;
  }
</style>
