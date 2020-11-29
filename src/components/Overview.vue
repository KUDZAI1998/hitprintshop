<template>
  <div class="container-fluid my-5">
    <WalletBalance/>
    <ul class="nav" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#documents" role="tab" aria-controls="home" aria-selected="true">Documents</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#transactions" role="tab" aria-controls="profile" aria-selected="false">Transactions</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent" style="width: 100%;">
      <div class="tab-pane fade show active dont-show" id="documents" role="tabpanel" aria-labelledby="documents-tab">
        <Documents/>
      </div>
      <div class="tab-pane fade dont-show" id="transactions" role="tabpanel" aria-labelledby="transactions-tab">
        <Transactions/>
      </div>
    </div>
  </div>
</template>

<script>
import WalletBalance from './WalletBalance.vue'
import Transactions from './Transactions'
import Documents from './Documents'
export default {
  components: {
    WalletBalance,
    Documents,
    Transactions
  }
}
</script>

<style scoped>
.nav-link{
  padding-top: 3px;
  padding-bottom: 3px;
  color: #717983;
}

.active{
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 25px;
  background: rgb(211, 218, 224);
  color: #000;
  font-weight: bold;
}

.dont-show{
  background-color: rgb(236, 240, 244);
}
</style>
