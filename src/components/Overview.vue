<template>
  <div class="container-fluid my-5">
    <div class="row align-items-center" style="width: 100%;">
      <div class="col-md-12 text-secondary border-1 py-3 m-3 notification align rounded">
        <h6 class="font-weight-bold">Important*</h6>
        <ul>
          <li>At the moment only <strong>PDF</strong> documents can be submitted through this application. (Also note that scanned <strong>PDF</strong> documents will not work 🐒).</li>
          <li>Printing currently costs $10 per page.</li>
          <li>Topup transactions ⚡ may take up to 5 minutes to update your wallet balance (depending on network traffic).</li>
          <li>If you delete your document while it's still pending, the transaction process will be reversed.</li>
          <li>Before submitting your document please check the number of pages read by the application.</li>
        </ul>
      </div>
    </div>
    <WalletBalance/>
    <ul class="nav" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#documents" role="tab" aria-controls="home" aria-selected="true">Documents</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#transactions" role="tab" aria-controls="profile" aria-selected="false">Transactions</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
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

.notification{
  background-color: rgba(148, 148, 150, 0.2);
  border: 2px solid rgba(128, 128, 128, 0.4);
}
</style>
