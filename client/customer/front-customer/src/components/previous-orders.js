import { store } from '../redux/store.js'
import { addToCart } from '../redux/cart-slice.js'

class PreviousOrders extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/products`)
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
        }

        .previous-orders {
          border-bottom: 1px solid hsl(0deg 0% 100%);
          display: flex;
          flex-direction: column;
          width: 100%;
          font-family: "Ubuntu", sans-serif;
          max-height: 10vh;
          min-height: 10vh;
          overflow-y: auto;¡
        }

        .previous-orders::-webkit-scrollbar {
          width: 5px;
          
        }

        .previous-orders::-webkit-scrollbar-thumb {
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
        .previuos-orders-form-button{
          align-items: center;
          background-color: hwb(0deg 100% 0%);
          border: 0;
          border-radius: 10PX;
          color: #551A8B;
          font-family: ubuntu;
          font-size: 0.75em;
          font-weight: 700;
          display: flex;
          gap: 1rem;
          justify-content: center;    
          width: 45%;  
        }

        .table-product-order {
          color: hsl(0deg 0% 100%);
          list-style-type: none;
        }
   
      </style>
      <section class="previous-orders">
        <div class="previuos-orders-form">
          <div class="previuos-orders-form-reference">            
              <input type="number" value=""> 
              <button class="previuos-orders-form-button">Buscar por Referencia</button>            
          </div>
          <div class="previuos-orders-form-date">
              <input type="date" value=""> 
              <button class="previuos-orders-form-button">Buscar por Fecha</button>          
          </div>
        </div>
        <div class="table-previous-order"></div>
      </section>
    `
  }
}

customElements.define('previous-orders-component', PreviousOrders)
