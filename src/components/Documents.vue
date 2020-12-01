<template>
<div class="row align-items-center" style="width: 100%;">
  <div class="col-md-12 my-3">
    <table class="table table-hover border-0 shadow-lg rounded">
      <thead>
        <tr style="background-color: rgb(242, 245, 247); color: rgb(108, 117, 127);">
          <th>Document Name</th>
          <th>Date Submitted</th>
          <th>Printing Cost</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="documents.length > 0">
          <tr v-for="document in documents" :key="document._id">
            <td>{{ document.name }}</td>
            <td>{{ new Date(document.created_at).toLocaleString() }}</td>
            <td>${{ document.cost }}</td>
            <td><span class="badge badge-pill" :class="{'isPending': document.status == 'pending', 'isPrinting': document.status == 'printing', 'isPrinted': document.status == 'done'}">{{ document.status }}</span></td>
            <td><i @click="downloadDocument(document._id)" class="fas fa-download text-info px-1"></i><i @click="deleteDocument(document._id)" class="fas fa-trash text-danger px-1"></i></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="5">No documents submitted 😔.</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { getAccessToken } from '../utils/auth'
import axios from './../utils/axios'
export default {
  mounted: function () {
    this.load()
  },
  data () {
    return {
      documents: []
    }
  },
  methods: {
    async load () {
      let response = await axios.get('/documents', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      })
      if (response.status === 200) {
        this.documents = response.data.documents
      }
    },
    async deleteDocument (id) {
      let response = await axios.get(`/documentx/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      })

      if (response.status === 200) {
        this.$toasted.success('Deleted')
        this.load()
        this.$root.$emit('wallet-refresh')
      }
    }
  }
}
</script>

<style scoped>
.isPrinted{
  background-color: rgba(0, 186, 68, 0.2);
  color: rgb(0, 186, 68);
}

.isPrinting{
  background-color: rgba(86, 1, 255, 0.2);
  color: rgb(86, 1, 255);
}

.isPending{
  background-color: rgba(251, 210, 0, 0.2);
  color: rgb(251, 210, 0);
}

.fa-trash:hover, .fa-download:hover{
  transform: scale(1.05);
}
</style>
