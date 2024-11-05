import { store } from '../redux/store.js'
import { addToCart } from '../redux/cart-slice.js'

class Order extends HTMLElement {
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

        .orders {
          display: flex;
          flex-direction: column;
          width: 100%;
          font-family: "Ubuntu", sans-serif;
          max-height: 80vh;
          min-height: 80vh;
          overflow-y: auto;
          padding: 10px;
        }

        .orders::-webkit-scrollbar {
          width: 5px;
          
        }

        .orders::-webkit-scrollbar-thumb {
          background-color: hsl(225, 63%, 65%);
          border-radius: 10px;
        }

        .table-product-order {
          color: hsl(0deg 0% 100%);
          list-style-type: none;
        }

        .table-product-order ul {
          display: flex;
          justify-content: space-between;
          width: 100%;
          
        }

        .table-product-order li {
          color: hsl(0deg 0% 100%);
          list-style-type: none;
          padding-top: 0.5rem;
        }
        .table-product-order ul.secondUl {
          border-bottom: solid 0.05rem hsl(232.62deg 79.23% 66.59%);        
        }
        .table-product-order ul.secondUl li.selector {
          padding-bottom: 0.5rem;  

        }

        .quantity-controls {
          display: flex;
          align-items: center;
        }

        .quantity-controls button {¡
          font-size: 1rem;
          font-family: "Ubuntu", sans-serif;
        }

        .quantity-controls input {
          background-color: hsl(240deg 27.66% 46.08%);
          color: hsl(0deg 0% 100%);
          text-align: center;
          width: 50px;
          
        }
      </style>
      <section class="orders">
        <div class="table-product-order"></div>
      </section>
    `

    const tableProductOrder = this.shadow.querySelector('.table-product-order')

    this.data.forEach(element => {
      const tableRegister = document.createElement('div')
      tableRegister.classList.add('table-register')
      tableProductOrder.appendChild(tableRegister)

      const tableRegisterButtons = document.createElement('div')
      tableRegisterButtons.classList.add('table-register-buttons')
      tableRegister.appendChild(tableRegisterButtons)

      const tableRegisterButtonsUl = document.createElement('ul')
      tableRegisterButtons.appendChild(tableRegisterButtonsUl)

      const tableRegisterData = document.createElement('div')
      tableRegisterData.classList.add('table-register-data')
      tableRegister.appendChild(tableRegisterData)

      const tableRegisterDatasUl = document.createElement('ul')
      tableRegisterData.appendChild(tableRegisterDatasUl)

      // Crear el primer li con el nombre del producto
      let tableRegisterDatasLi = document.createElement('li')
      tableRegisterDatasLi.textContent = `${element.name}`
      tableRegisterDatasUl.appendChild(tableRegisterDatasLi)

      // Crear el segundo li con el precio
      tableRegisterDatasLi = document.createElement('li')
      tableRegisterDatasLi.textContent = `${element.price.basePrice} €`
      tableRegisterDatasUl.appendChild(tableRegisterDatasLi)

      const tableRegisterDatasUlSelector = document.createElement('ul')
      tableRegisterDatasUlSelector.classList.add('secondUl')
      tableRegisterData.appendChild(tableRegisterDatasUlSelector)

      // Primer li con la unidad de medida
      tableRegisterDatasLi = document.createElement('li')
      tableRegisterDatasLi.classList.add('selector')
      tableRegisterDatasLi.textContent = `${element.measurement + ' ' + element.measurementUnit}`
      tableRegisterDatasUlSelector.appendChild(tableRegisterDatasLi)

      // Segundo li con los controles de cantidad
      const quantityControlsLi = document.createElement('li')
      quantityControlsLi.classList.add('selector')

      // Crear controles de cantidad
      const quantityControls = document.createElement('div')
      quantityControls.classList.add('quantity-controls')

      // Botón de disminuir (-)
      const decreaseButton = document.createElement('button')
      decreaseButton.textContent = '-'
      decreaseButton.dataset.id = element.id

      decreaseButton.addEventListener('click', () => {
        const quantityInput = quantityInputField.value
        if (quantityInput > 0) {
          const quantity = parseInt(quantityInput) - 1
          quantityInputField.value = quantity

          const data = {
            ...element,
            quantity
          }

          store.dispatch(addToCart(data))
        }
      })

      // Campo de entrada de cantidad
      const quantityInputField = document.createElement('input')
      quantityInputField.type = 'number'
      quantityInputField.value = 0 // Valor inicial
      quantityInputField.min = 0 // Valor mínimo

      // Botón de aumentar (+)
      const increaseButton = document.createElement('button')
      increaseButton.textContent = '+'
      increaseButton.dataset.id = element.id

      increaseButton.addEventListener('click', () => {
        const quantityInput = quantityInputField.value
        const quantity = parseInt(quantityInput) + 1
        quantityInputField.value = quantity

        const data = {
          ...element,
          quantity
        }

        store.dispatch(addToCart(data))
      })

      // Añadir los botones y el input a los controles de cantidad
      quantityControls.appendChild(decreaseButton)
      quantityControls.appendChild(quantityInputField)
      quantityControls.appendChild(increaseButton)

      // Añadir los controles de cantidad al segundo <li> con clase selector
      quantityControlsLi.appendChild(quantityControls)

      // Añadir ambos li al ul de selección
      tableRegisterDatasUlSelector.appendChild(quantityControlsLi)
    })
  }
}

customElements.define('orders-component', Order)
