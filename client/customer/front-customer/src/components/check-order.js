import { store } from '../redux/store.js'

class CheckOrder extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.unsubscribe = null
    this.products = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(async () => {
      const currentState = store.getState()
      this.products = currentState.cart.cartProducts
      await this.render()
    })

    await this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
      
      section{
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;        
      }

      .container{
        display: flex;
        flex-direction: column;      
      }      
      .container-button{
        cursor:pointer;
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 30px;
        width: 100%;
      }

      .button-check-order, .payment-button button{
        align-items: center;
        background-color: hwb(0deg 100% 0%);
        border: 0;
        border-radius: 10PX;
        color: #551A8B;
        font-family: ubuntu;
        font-size: 1em;
        font-weight: 700;
        display: flex;
        gap: 1rem;
        justify-content: center;        
        height: 30PX;
        width: 80%;        
      }

      .button-check-order:hover{
        background-color: hwb(0deg 70% 25%);
      }
      .payment-button{       
        display: flex;
        justify-content: center;  
      }
      .check-order-resume{
        background-color: hwb(256 1% 66%);
        right: -100%;
        height: 100%;
        position: fixed;
        top:0;
        transition: right 0.3s;
        width:100%;
        z-index:1000;
      }

      .check-order-resume.active{
        right: 0;
      }

      .check-order-resume-header{
        background-color: hsl(0, 0%, 0%);
        display: flex;
        justify-content: space-between;
        padding: 0.75rem ;
      }

      .check-order-resume-header-title h1{
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

      .check-order-resume-main{
        display: flex; 
        flex-direction: column;
        gap: 2rem;
        padding: 1rem;
      }

      .check-order-resume .order-list{
        height: 100%;
        width:100%;
      }

      .check-order-resume-data {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-family: "Ubuntu", sans-serif;
        max-height: 70vh;
        min-height: 70vh;
        overflow-y: auto;
      }

      .check-order-resume-data::-webkit-scrollbar {
        width: 5px;          
      }

      .check-order-resume-data::-webkit-scrollbar-thumb {
        background-color: hsl(225, 63%, 65%);
        border-radius: 10px;
      }

      .check-order-resume-data {
        color: hsl(0deg 0% 100%);
        list-style-type: none;
      }

      .check-order-resume-data ul {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0.25rem 0.5rem;
        width: 90%;          
      }

      .check-order-resume-data li {
        color: hsl(0deg 0% 100%);
        list-style-type: none;
      }
      .check-order-resume-data ul.secondUl {
        border-bottom: solid 0.05rem hsl(232.62deg 79.23% 66.59%);        
      }
      .check-order-resume-data ul.secondUl li.selector {
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

      .confirmation {
          background-color: hwb(256 1% 66%);
          color: hsl(0, 0%, 100%);          
          font-family: Ubuntu, sans-serif;
          left: 0;
          height: 100%;
          padding-top: 10rem;
          position: fixed;
          text-align: center;
          top: 0;          
          width: 100%;
        }
        .back-start-button{
          display: flex;
          justify-content: center;
        }
        .back-start-button button{
          align-items: center;
          background-color: hwb(0deg 100% 0%);
          border: 0;
          border-radius: 10PX;
          color: #551A8B;
          font-family: ubuntu;
          font-size: 1em;
          font-weight: 700;
          display: flex;
          gap: 1rem;
          justify-content: center;        
          height: 30PX;
          width: 80%;  
        }
    </style>
    <section class="check-order">    
      <div class="container-button">
        <button class="button-check-order">Ver pedido</button>
      </div>    
      <div class="check-order-resume"> 
        <div class="check-order-resume-header">
          <div class="check-order-resume-header-title">
              <h1>Resumen del Pedido</h1>
          </div>
          <div class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left-bold</title><path d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" /></svg>
          </div>
        </div>
        <div class="check-order-resume-main">
          <div class="check-order-resume-data"></div>

          <div class="check-order-resume-payment">
            <div class="total-price">
              <h3>Total</h3>
              <span></span>
            </div> 
            <div class="taxes">
              <span>Impuestos no incluidos</span>
            </div>
            <div class="payment-button">
              <button>Finalizar pedido</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    `

    this.shadow.querySelector('.button-check-order').addEventListener('click', () => {
      this.shadow.querySelector('.check-order-resume').classList.add('active')
    })

    this.shadow.querySelector('.back-button').addEventListener('click', () => {
      this.shadow.querySelector('.check-order-resume').classList.remove('active')
    })
    this.shadow.querySelector('.payment-button').addEventListener('click', () => this.completeOrder())
    this.shadow.querySelector('.payment-button').addEventListener('click', async () => {
      const data = {
        products: this.products
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      this.completeOrder(result.reference)
    })

    const checkOrderResumeData = this.shadow.querySelector('.check-order-resume-data')

    if (!this.products) {
      this.shadow.querySelector('.check-order-resume-payment').innerHTML = ''
      const message = document.createElement('h3')
      message.textContent = 'No hay productos en la cesta'
      checkOrderResumeData.appendChild(message)
    } else {
      this.products.forEach(element => {
        const tableRegister = document.createElement('div')
        tableRegister.classList.add('table-register')
        checkOrderResumeData.appendChild(tableRegister)

        const tableRegisterData = document.createElement('div')
        tableRegisterData.classList.add('table-register-data')
        tableRegister.appendChild(tableRegisterData)

        const tableRegisterDatasUl = document.createElement('ul')
        tableRegisterData.appendChild(tableRegisterDatasUl)

        let tableRegisterDatasLi = document.createElement('li')
        tableRegisterDatasLi.textContent = `${element.name}`
        tableRegisterDatasUl.appendChild(tableRegisterDatasLi)

        tableRegisterDatasLi = document.createElement('li')
        const totalPriceProduct = element.quantity * element.price.basePrice
        tableRegisterDatasLi.textContent = `${parseFloat(totalPriceProduct).toFixed(2)} €`
        tableRegisterDatasUl.appendChild(tableRegisterDatasLi)

        const tableRegisterDatasUlSelector = document.createElement('ul')
        tableRegisterDatasUlSelector.classList.add('secondUl')
        tableRegisterData.appendChild(tableRegisterDatasUlSelector)

        // Primer li con la unidad de medida
        tableRegisterDatasLi = document.createElement('li')
        tableRegisterDatasLi.classList.add('selector')
        tableRegisterDatasLi.textContent = `${element.measurement + ' ' + element.measurementUnit}`
        tableRegisterDatasUlSelector.appendChild(tableRegisterDatasLi)

        tableRegisterDatasLi = document.createElement('li')
        tableRegisterDatasLi.textContent = `${element.quantity} x ${element.price.basePrice} €`
        tableRegisterDatasUlSelector.appendChild(tableRegisterDatasLi)
      })

      const totalPriceElement = this.shadow.querySelector('.total-price span')

      const totalPrice = this.products.reduce((acc, element) =>
        acc + (element.quantity * element.price.basePrice), 0)

      totalPriceElement.textContent = parseFloat(totalPrice).toFixed(2) + ' €'
    }
  }

  completeOrder (referenceNumber) {
    const checkOrderContainer = this.shadow.querySelector('.check-order')
    checkOrderContainer.innerHTML = ''

    checkOrderContainer.innerHTML = /* html */`
      <div class="confirmation">
        <h3>Pedido realizado con exito</h3>
        <p>En breve recibirá un correo con los dealles. <br>
          La referencia de su pedido es <span class="reference-number"></span>
        </p>
        <div class="back-start-button">
          <button>Volver al Inicio</button>
        </div>
      </div>
    `

    const referenceNumberElement = this.shadow.querySelector('.reference-number')
    referenceNumberElement.textContent = referenceNumber
  }
}

customElements.define('check-order-component', CheckOrder)
