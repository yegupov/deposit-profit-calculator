import Vue from "vue";

document.querySelectorAll('[data-plan="calculator"]').forEach(el => {

  const plans = JSON.parse(el.getAttribute('data-payload'));

  el.removeAttribute('data-plan');
  el.removeAttribute('data-payload');

  new Vue({
    el,
    data: () => ({
      currency: "$",
      plans,
      planTerm: plans.usd.minDuration,
      // planTerm: plan.minDuration,
      deposit: 0,
      isRulesAccepted: false
    }),

    computed: {
      plan() {
        if (this.currency === "$") {
          return this.plans.usd;
        } else {
          return this.plans.btc;
        }
      },

      minInvestBitcoin() {
        return (this.plan.minInvest).toFixed(8);
      },

      maxInvestBitcoin() {
        return (this.plan.maxInvest).toFixed(8);
      },

      isDepositCorrect() {
        return this.deposit >= this.plan.minInvest && this.deposit <= this.plan.maxInvest;
      },

      totalProfit() {
        const totalProfitRaw = parseFloat(this.deposit) * this.planTerm * this.plan.profit;
        const totalProfit = this.plan.bodyReturn ? totalProfitRaw + parseFloat(this.deposit) : totalProfitRaw
        if (this.currency === "$") {
          return totalProfit.toFixed(0);
        } else {
          return totalProfit.toFixed(10);
        }
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
      },

      chooseCurrency(event) {
        this.deposit = 0;
        this.planTerm = this.plan.minDuration;

        let currencyLabels = event.target.closest('.plan__currencies').children;

        for (var i=0, child; child=currencyLabels[i]; i++) {
          child.classList.remove('selected');
        }
        event.target.parentNode.classList.add('selected');
      },

      indicateCurrencySymbol(input, spans) {
        if (input.checked) {
          spans.forEach(span => {
            span.innerHTML = "₿";
          });
        } else {
          spans.forEach(span => {
            span.innerHTML = "$";
          });
        }
      }

    }

  });
})
