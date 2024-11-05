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
      .button-check-order{
        display: flex;
        gap: 1rem;
        justify-content: center;
        font-family: ubuntu;
        WIDTH: 80%;
        BACKGROUND-COLOR: hwb(0deg 100% 0%);
        BORDER: 0;
        BORDER-RADIUS: 10PX;
        HEIGHT: 30PX;
        ALIGN-ITEMS: center;
        font-size: 1em;
        color: #551A8B;
        font-weight: 700;
      }

      .button-check-order:hover{
        background-color: hwb(0deg 70% 25%);
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

      .check-order-resume .order-list{
        height: 100%;
        width:100%;
      }

      .check-order-resume-data {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-family: "Ubuntu", sans-serif;
        max-height: 80vh;
        min-height: 80vh;
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
        <div class="check-order-resume-data"></div>   
        <div class="check-order-finish"></div>   
      </div>
    </section>
    `

    this.shadow.querySelector('.button-check-order').addEventListener('click', () => {
      this.shadow.querySelector('.check-order-resume').classList.add('active')
    })

    this.shadow.querySelector('.back-button').addEventListener('click', () => {
      this.shadow.querySelector('.check-order-resume').classList.remove('active')
    })

    const checkOrderResumeData = this.shadow.querySelector('.check-order-resume-data')

    if (!this.products) {
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
        tableRegisterDatasLi.textContent = `${totalPriceProduct} €`
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
    }
  }
}

customElements.define('check-order-component', CheckOrder)
