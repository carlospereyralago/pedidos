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
    console.log(this.data)
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

        /*/COMIENZO CLASES DETALLES DEL PEDIDO /*/
        

      .button-check-order:hover{
        background-color: hwb(0deg 70% 25%);
      }
      
      .previous-order-detail{
        background-color: hwb(256 1% 66%);
        right: -100%;
        height: 100%;
        position: fixed;
        top:0;
        transition: right 0.3s;
        width:100%;
        z-index:1000;
      }

      .previous-order-detail.active{
        right: 0;
      }

      .previous-order-detail-header{
        background-color: hsl(0, 0%, 0%);
        display: flex;
        justify-content: space-between;
        padding: 0.75rem ;
      }

      .previous-order-detail-header-title h1{
        color: hsl(0, 0%, 100%);
        font-family: "Ubuntu", sans-serif;
        font-size: 1rem;
        margin: 0;
      }

      .back-button svg{
        fill: hsl(0, 0%, 100%);
        height: 1.5rem;
        width: 1.5rem;
      }

      .previous-order-detail-main{
        display: flex; 
        flex-direction: column;
        gap: 2rem;
        padding: 1rem;
      }

      .previous-order-detail .order-list{
        height: 100%;
        width:100%;
      }

      .previous-order-detail-data {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-family: "Ubuntu", sans-serif;
        max-height: 70vh;
        min-height: 70vh;
        overflow-y: auto;
      }

      .previous-order-detail-data::-webkit-scrollbar {
        width: 5px;          
      }

      .previous-order-detail-data::-webkit-scrollbar-thumb {
        background-color: hsl(225, 63%, 65%);
        border-radius: 10px;
      }

      .previous-order-detail-data {
        color: hsl(0deg 0% 100%);
        list-style-type: none;
      }

      .previous-order-detail-data ul {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0.25rem 0.5rem;
        width: 90%;          
      }

      .previous-order-detail-data li {
        color: hsl(0deg 0% 100%);
        list-style-type: none;
      }
      .previous-order-detail-data ul.secondUl {
        border-bottom: solid 0.05rem hsl(232.62deg 79.23% 66.59%);        
      }
      .previous-order-detail-data ul.secondUl li.selector {
        padding-bottom: 0.5rem;  
      }
      .total-price{
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      .total-price h3{
        color: hsl(0, 0%, 100%);
        font-family: "Ubuntu", sans-serif;
      }
      .total-price span{
        color: hsl(0, 0%, 100%);
        font-family: "Ubuntu", sans-serif;
      }
      .taxes span{
        color: hsl(0, 0%, 100%);
        font-family: "Ubuntu", sans-serif;
        padding: 10px 0;
        display: flex;
      }

      </style>
      <section class="previous-orders">
        <div class="previous-orders-table">        
          <div class="previous-order-list"></div>          
        </div>
        <div class="previous-order"></div>

        <div class="previous-order-detail"> 
          <div class="previous-order-detail-header">
            <div class="previous-order-detail-header-title">
                <h1>Resumen del Pedido</h1>
            </div>
            <div class="back-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left-bold</title><path d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" /></svg>
            </div>
          </div>
          <div class="previous-order-detail-main">
            <div class="previous-order-detail-data"></div>
            <div class="check-order-resume-payment">
              <div class="total-price">
                <h3>Total</h3>
                <span></span>
              </div> 
              <div class="taxes">
                <span>Impuestos no incluidos</span>
            </div>            
          </div>
            
          </div>
      </div>
      </section>
    `

    const previousOrderList = this.shadow.querySelector('.previous-order-list')

    this.shadow.querySelector('.back-button').addEventListener('click', () => {
      this.shadow.querySelector('.previous-order-detail').classList.remove('active')
    })

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
      orderListLiDate.classList.add('date-button-li')
      orderListLiDate.textContent = `${element.saleDate + ' ' + element.saleTime}`
      orderListUlDate.appendChild(orderListLiDate)

      const showOrderButtonLi = document.createElement('li')
      showOrderButtonLi.classList.add('date-button-li')

      const showOrderButton = document.createElement('button')
      showOrderButton.dataset.id = element.id
      showOrderButton.textContent = 'Ver Pedido'
      showOrderButton.classList.add('show-order-button')

      showOrderButton.addEventListener('click', () => {
        const previousOrderDetail = this.shadow.querySelector('.previous-order-detail')
        if (previousOrderDetail) {
          previousOrderDetail.classList.add('active')
        }
      })

      showOrderButtonLi.appendChild(showOrderButton)
      orderListUlDate.appendChild(showOrderButtonLi)
    })

    previousOrderList.addEventListener('click', event => {
      if (event.target.closest('.show-order-button')) {
        const showOrderButton = event.target.closest('.show-order-button')
        const saleId = parseInt(showOrderButton.dataset.id)

        const sale = this.data.find(sale => sale.id === saleId)
        this.showPreviousOrder(sale)
      }
    })
  }

  showPreviousOrder (sale) {
    const previousOrderDetailData = this.shadow.querySelector('.previous-order-detail-data')
    previousOrderDetailData.innerHTML = ''

    sale.saleDetails.forEach(element => {
      const tableRegister = document.createElement('div')
      tableRegister.classList.add('table-register')
      previousOrderDetailData.appendChild(tableRegister)

      const tableRegisterData = document.createElement('div')
      tableRegisterData.classList.add('table-register-data')
      tableRegister.appendChild(tableRegisterData)

      const tableRegisterDatasUl = document.createElement('ul')
      tableRegisterData.appendChild(tableRegisterDatasUl)

      let tableRegisterDatasLi = document.createElement('li')
      tableRegisterDatasLi.textContent = `${element.productName}`
      tableRegisterDatasUl.appendChild(tableRegisterDatasLi)

      tableRegisterDatasLi = document.createElement('li')
      const totalPriceProduct = element.quantity * element.basePrice
      tableRegisterDatasLi.textContent = `${parseFloat(totalPriceProduct).toFixed(2)} €`
      tableRegisterDatasUl.appendChild(tableRegisterDatasLi)

      const tableRegisterDatasUlSelector = document.createElement('ul')
      tableRegisterDatasUlSelector.classList.add('secondUl')
      tableRegisterData.appendChild(tableRegisterDatasUlSelector)

      tableRegisterDatasLi = document.createElement('li')
      tableRegisterDatasLi.classList.add('selector')
      tableRegisterDatasLi.textContent = `${element.product.measurement + ' ' + element.product.measurementUnit}`
      tableRegisterDatasUlSelector.appendChild(tableRegisterDatasLi)

      tableRegisterDatasLi = document.createElement('li')
      tableRegisterDatasLi.textContent = `${element.quantity} x ${element.basePrice} €`
      tableRegisterDatasUlSelector.appendChild(tableRegisterDatasLi)

      const totalPriceElement = this.shadow.querySelector('.total-price span')

      const totalPrice = sale.saleDetails.reduce((acc, element) =>
        acc + (element.quantity * element.basePrice), 0)

      totalPriceElement.textContent = parseFloat(totalPrice).toFixed(2) + ' €'
    })
  }
}

customElements.define('previous-orders-table-component', PreviousOrdersTable)
