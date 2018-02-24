<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm4>

          <!-- seller's short bio -->
          <v-card class="ma-2">
            <v-card-title class="">
              <h3>Posted by</h3>
            </v-card-title>
            <v-list two-line style="width: 100%">
              <template>
                <v-list-tile avatar  @click="">
                  <v-list-tile-avatar>
                    <v-icon class="primary--text" size="40px">perm_identity</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>@kay_p</v-list-tile-title>
                    <v-list-tile-sub-title>Kudakwashe Paradzayi</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>

            <v-card-actions>
              <v-btn color="primary" block>Follow</v-btn>
            </v-card-actions>
          </v-card> <!-- Seller's profile -->

          <!-- the pictures -->
          <v-card class="ma-2"  color="purple">
            <v-card-media height="300px" :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"></v-card-media>
          </v-card> <!-- the pictures -->

          <!-- map part -->
          <v-card class="ma-2">
            <v-card-title>
              <v-icon>location_on</v-icon> 123 Magamba road
            </v-card-title>
            <!-- map with directions -->
            <div style="height: 200px" class="brown"></div>
            <v-card-actions>
              <v-btn flat block> <v-icon>map</v-icon> Get Directions</v-btn>
            </v-card-actions>
          </v-card> <!-- map part -->
        </v-flex>

        <v-flex xs12 sm8>
          <!-- descriptions and ratings -->
          <v-card class="ma-2">
            <v-card-title>
              <h3>Dell XPS</h3>
            </v-card-title>
            <p class="ml-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, repellat! Voluptate, molestias. Dignissimos distinctio accusantium non, in odio nemo suscipit vel magni incidunt atque voluptas eius commodi enim sunt possimus.
            </p>
            <hr>
            <v-card-actions>
              <v-btn flat> <v-icon>favorite</v-icon> 3K</v-btn>
              <span><star-rating v-model="ratings" :star-size="16" inline text-class="white--text" class="ml-2" read-only/></span>
            </v-card-actions>
          </v-card> <!-- descriptions and rating -->

          <v-card class="ma-2">
            <v-card-title class="primary" dark>
              <v-text-field
                prepend-icon="comment"
                append-icon="send"
                label="Comment"
                solo
                class="mx-3 black--text"
                multi-line
                flat/>
            </v-card-title>
            <div class="chat-area" v-for="n in 10" :key="n">
              <div class="chat-item">
                <v-layout class="">
                  <v-flex xs2 sm1>
                    <div class="chat-item-avatar">
                    </div>
                  </v-flex>

                  <v-flex xs10 sm11>
                    <div class="chat-item-main">
                      <h3>@kay_p
                        <span style="color: gray; font-size: 10px;">2 days ago</span>
                      </h3>
                      <div class="chat-item-main-message">
                        This is awesome ma boss. Keep it up
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
            </div>
            <v-card-actions class="justify-center">
              <v-btn outline color="primary">load more comments</v-btn>
            </v-card-actions>
          </v-card>
          
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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
  data: () => ({
    ratings: 3.5
  })
}
</script>

<style scoped>
  .chat-area {
    width: 100%;
    padding: 10px;
  }
  .chat-item {
    margin-bottom: 10px;
  }
  .chat-item-avatar {
    height: 40px;
    width: 40px;
    background: rgba(65, 65, 66, 0.63);
    border-radius: 50%;
  }

  .chat-item-main-message{
    background: rgba(209, 209, 209, 0.63);
    border-radius: 15px;
    padding: 20px;

  }

  .chat-item-main:after {
    content: '';
    clear:both
  }
</style>
