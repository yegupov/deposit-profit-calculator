import Vue from "vue";

document.querySelectorAll('[data-plan="calculator"]').forEach(el => {
  const plan = JSON.parse(el.getAttribute('data-payload'));
  el.removeAttribute('data-plan');
  el.removeAttribute('data-payload');

  new Vue({
    el,
    data: () => ({
      plan,
      planTerm: plan.minDuration,
      deposit: 0,
      isRulesAccepted: false
    }),

    computed: {
      isDepositCorrect() {
        return this.deposit >= this.plan.minInvest && this.deposit <= this.plan.maxInvest;
      },
      totalProfit() {
        const totalProfitRaw = this.deposit * this.planTerm * this.plan.profit;
        const totalProfit = this.plan.bodyReturn ? totalProfitRaw + this.deposit : totalProfitRaw
        return totalProfit.toFixed(0);
      },
      isAllFieldsVerified() {
        return this.isDepositCorrect && this.isRulesAccepted;
      },
      someFieldsIncorrect() {
        return !this.isAllFieldsVerified;
      }
    },

    methods: {
    makeDeposit() {
        let popup = document.querySelector('.popup');
        popup.style.display = "flex";
        document.querySelector('.popup__btn-close').addEventListener("click", function () {
          popup.style.display = "none";
        }.bind(this));
        document.querySelector('.overlay').addEventListener("click", function () {
          popup.style.display = "none";
        }.bind(this));
      }
    }

  });
})
