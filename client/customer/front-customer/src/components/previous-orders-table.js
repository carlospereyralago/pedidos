class PreviousOrdersTable extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales`)
    this.data = await response.json()
  }

  render () {
    this.shadow.innerHTML =
      /* html */ `
      <style>
        * {
          box-sizing: border-box;
          border-width: 0;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .previous-order-list {
          border-bottom: 1px solid hsl(0deg 0% 100%);
          color: hsl(0deg 0% 100%);
          display: flex;
          flex-direction: column;
          font-family: "Ubuntu", sans-serif;
          max-height: 80vh;
          min-height: 80vh;
          overflow-y: auto;
          width: 100%;
          
        }

        .previous-order-list::-webkit-scrollbar {
          width: 5px;
          
        }

        .previous-order-list::-webkit-scrollbar-thumb {
          background-color: hsl(225, 63%, 65%);
          border-radius: 10px;
        }

        .previuos-orders-form{
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .previuos-orders-form-reference, .previuos-orders-form-date{
          display: flex;          
          justify-content: space-between;
          padding-top: 0.5rem;
          width: 100%;
        }

        .previuos-orders-form-reference input, .previuos-orders-form-date input{
          display: flex;
          width: 45%;
        }
        
        .orders-list {
        border-bottom: 1px solid hsl(0deg 0% 100%);
        flex: none;
        width: 100%;
        }
        .orders-list ul{
        padding: 1vh;
        }
        .reference-price {
        display: flex;
        justify-content: space-between;
        width: 100%;
        }
        .date-button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        }
        .date-button li {
          font-size: 0.75rem;
        }
        .show-order-button{
          align-items: center;
          background-color: hwb(0deg 100% 0%);
          border: 0;
          border-radius: 3PX;
          color: #551A8B;
          font-family: ubuntu;
          font-size: 1em;
          font-weight: 700;
          display: flex;
          gap: 1rem;
          justify-content: center;
          width: 100%;
        }

        .table-product-order {
          color: hsl(0deg 0% 100%);
          list-style-type: none;
        }
   
      </style>
      <section class="previous-orders">
        <div class="previous-orders-table">        
          <div class="previous-order-list"></div>
          <div class="previous-order-detail"></div>
        </div>
        <div class="previous-order">        
        </div>
      </section>
    `

    const previousOrderList = this.shadow.querySelector('.previous-order-list')

    this.data.forEach(element => {
      const ordersList = document.createElement('div')
      ordersList.classList.add('orders-list')
      previousOrderList.appendChild(ordersList)

      const orderListUlReference = document.createElement('ul')
      orderListUlReference.classList.add('reference-price')
      ordersList.appendChild(orderListUlReference)

      let orderListLiReference = document.createElement('li')
      orderListLiReference.textContent = `${element.reference}`
      orderListUlReference.appendChild(orderListLiReference)

      orderListLiReference = document.createElement('li')
      orderListLiReference.textContent = `${element.totalBasePrice}` + ' €'
      orderListUlReference.appendChild(orderListLiReference)

      const orderListUlDate = document.createElement('ul')
      orderListUlDate.classList.add('date-button')
      ordersList.appendChild(orderListUlDate)

      const orderListLiDate = document.createElement('li')
      orderListUlDate.classList.add('date-button-li')
      orderListLiDate.textContent = `${element.saleDate + ' ' + element.saleTime}`
      orderListUlDate.appendChild(orderListLiDate)

      const showOrderButtonLi = document.createElement('li')
      showOrderButtonLi.classList.add('date-button-li')

      const showOrderButton = document.createElement('button')
      showOrderButton.dataset.id = element.id
      showOrderButton.textContent = 'Ver Pedido'
      showOrderButton.classList.add('show-order-button')

      showOrderButtonLi.appendChild(showOrderButton)
      orderListUlDate.appendChild(showOrderButtonLi)
    })

    previousOrderList.addEventListener('click', event => {
      if (event.target.closest('.show-order-button')) {
        const showOrderButton = event.target.closest('.show-order-button')
        const saleId = parseInt(showOrderButton.dataset.id)

        const sale = this.data.find(sale => sale.id === saleId)
        console.log(sale)
        this.showPreviousOrder(sale)
      }
    })
  }

  showPreviousOrder (sale) {

  }
}

customElements.define('previous-orders-table-component', PreviousOrdersTable)
