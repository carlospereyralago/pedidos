import isEqual from 'lodash-es/isEqual'
import { store } from '../../redux/store.js'
import { refreshTable } from '../../redux/crud-slice.js'

class SalesForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.unsubscribe = null
    this.formElementData = null
    this.endpoint = `${import.meta.env.VITE_API_URL}/api/admin/products`
  }

  connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.crud.formElement && !isEqual(this.formElementData, currentState.crud.formElement.data)) {
        this.formElementData = currentState.crud.formElement.data
        /* / aqui es donde le decimos que si la info esta cargada en el formulario entonces la limpiemos con reset form/ */
        if (this.formElementData) {
          this.showElement(this.formElementData)
        } else {
          this.resetForm()
        }
      }
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
            *{
                box-sizing: border-box;
            }

            ul{
                list-style: none;
                margin: 0;
                padding: 0;
            }

            label, li{
                color: hsl(0, 0%, 100%);
                font-family: "Ubuntu", sans-serif;
            }

            input {
                border: none;
                all: unset;
            }

            button{
                background-color: transparent;
                border: none;
                padding: 0;
                outline: none;
            }

            .form{
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 0 5px;
            }

            .form-header{
                align-items: center;
                background-color: hsl(0, 0%, 100%);
                display: flex;
                justify-content: space-between;  
            }

            .form-tabs ul{
                display: flex;
            }

    
            .form-tabs ul li{
                color:  hwb(256 1% 66%);
                cursor: pointer;
                height: 2rem;
                padding: 0.3rem;
            }

            .form-tabs ul li.active{
              background-color: hsl(272, 40%, 35%);
              color: white;
            }

            .form-buttons{
                padding: 0 0.5rem;
            }

            .form-buttons ul{
                align-items: center;
                display: flex;
                gap: 0.5rem;
                justify-content: flex-end;
            }

            .form-buttons ul svg{
                cursor:pointer;
                fill: hwb(256 1% 66%);
                height: 1.8rem;
                width: 1.8rem;

            }

            .tab-content{
              display: none;
            }

            .tab-content.active{
                display: grid;
                gap: 2rem;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }

            .form-element{
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .form-element input{
                background-color: hsl(225, 63%, 65%);
                border-bottom: solid 1px #fff;
                color: hsl(0, 0%, 100%);
                width:  100%;
                padding: 0.3rem 0;
            }

            .form-element input.error{
              border-bottom: 2px solid red;
            }

            .form-element select{
              background-color: hsl(225, 63%, 65%);
              border-bottom: solid 1px #fff;
              color: hsl(0, 0%, 100%);
              width:  100%;
              padding: 0.3rem 0;
            }

            .validation-errors{
              background-color: hsl(0, 93%, 66%);
              display: none;
              margin-bottom: 1rem;
              padding: 1rem;
            }

            .validation-errors.active{
              display: block;
            }

            .validation-errors ul{
              margin: 0;
              padding: 0;
            }

            .validation-errors li{
              color: hsl(0, 0%, 100%);
              font-weight: 600;
            }
        </style>
        <section class="form">
            
            <div class="form-header">
                <div class="form-tabs">
                    <ul>
                        <li class="tab active" data-tab="general">General</li>
                    </ul>
                </div>
                <div class="form-buttons">
                    <ul>
                        <li class="reset-button"> 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>broom</title><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" /></svg>
                        </li>
                        <li class="store-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-body">
              <div class="validation-errors">
                <ul></ul>
              </div>
              <form>
                <div class="tab-content active" data-tab="general"> 
                  <input name="id" type="hidden">
                  <div class="form-element">
                    <div class="form-element-label">
                      <label for="categoryId">Categoria</label>                
                    </div>
                    <div class="form-element-input">
                      <select name="productCategoryId"></select>
                    </div>
                  </div>

                  <div class="form-element">
                    <div class="form-element-label">
                      <label for="nombre">Nombre</label>                
                    </div>
                    <div class="form-element-input">
                      <input type="text" name="name">
                    </div>
                  </div>

                  <div class="form-element">
                    <div class="form-element-label">
                      <label for="precio">Precio</label>                
                    </div>
                    <div class="form-element-input">
                      <input type="number" name="basePrice">
                    </div>
                  </div>

                  <div class="form-element">
                    <div class="form-element-label">
                      <label for="referencia">Referencia</label>                
                    </div>
                    <div class="form-element-input">
                      <input type="text" name="reference">
                    </div>
                  </div>

                  <div class="form-element">
                    <div class="form-element-label">
                      <label for="measurementUnit">Unidad de medida</label>                
                    </div>
                    <div class="form-element-input">
                      <select name="measurementUnit">
                        <option value="gr">gr</option>
                        <option value="ml">ml</option>
                        <option value="ud">ud</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-element">
                    <div class="form-element-label">
                      <label for="measurement">Medida</label>                
                    </div>
                    <div class="form-element-input">
                      <input type="number" name="measurement">
                    </div>
                  </div>

                  <div class="form-element">
                    <div class="form-element-label">
                      <label for="categoryId">Visible</label>                
                    </div>
                    <div class="form-element-input">
                      <select name="visible">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
        </section>
        `

    this.loadProductCategories()
    this.renderStoreButton()
    this.renderResetButton()
    this.renderTabsButton()
  }

  async loadProductCategories () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product-categories`)
    this.productCategories = await response.json()

    const select = this.shadow.querySelector('[name="productCategoryId"]')

    this.productCategories.rows.forEach(category => {
      const option = document.createElement('option')
      option.value = category.id
      option.textContent = category.name
      select.appendChild(option)
    })
  }

  renderTabsButton () {
    this.shadow.querySelector('.form').addEventListener('click', async (event) => {
      if (event.target.closest('.tab')) {
        const tab = event.target.closest('.tab')

        if (!tab.classList.contains('active')) {
          this.shadow.querySelector('.tab.active').classList.remove('active')
          tab.classList.add('active')
          this.shadow.querySelector('.tab-content.active').classList.remove('active')
          this.shadow.querySelector(`.tab-content[data-tab="${tab.dataset.tab}"]`).classList.add('active')
        }
      }
    })
  }

  renderResetButton () {
    this.shadow.querySelector('.reset-button').addEventListener('click', async (event) => {
      this.resetForm()
    })
  }

  renderStoreButton () {
    this.shadow.querySelector('.store-button').addEventListener('click', async (event) => {
      event.preventDefault()

      const form = this.shadow.querySelector('form')

      const formData = new FormData(form)

      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const method = formDataJson.id ? 'PUT' : 'POST'
      const endpoint = formDataJson.id ? `${this.endpoint}/${formDataJson.id}` : this.endpoint

      try {
        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataJson)
        })

        if (response.status === 500 | response.status === 422) {
          throw response
        }

        if (response.status === 200) {
          document.dispatchEvent(new CustomEvent('message', {
            detail: {
              message: 'Elemento guardado correctamente',
              type: 'success'
            }
          }))
          store.dispatch(refreshTable(this.endpoint))
          this.resetForm()
        }
      } catch (error) {
        const data = await error.json()

        if (error.status === 500) {
          document.dispatchEvent(new CustomEvent('message', {
            detail: {
              message: data.message
            }
          }))
        }
        if (error.status === 422) {
          this.shadow.querySelector('.validation-errors').classList.add('active')
          const errorList = this.shadow.querySelector('.validation-errors ul')
          errorList.innerHTML = ''

          this.shadow.querySelectorAll('input.error').forEach(input => {
            input.classList.remove('error')
          })

          data.message.forEach(errorMessage => {
            this.shadow.querySelector(`[name='${errorMessage.path}']`).classList.add('error')
            const li = document.createElement('li')
            li.textContent = errorMessage.message
            errorList.appendChild(li)
          })
        }
      }
    })
  }

  resetForm = () => {
    this.shadow.querySelector('.validation-errors').classList.remove('active')
    const errorList = this.shadow.querySelector('.validation-errors ul')
    errorList.innerHTML = ''

    this.shadow.querySelectorAll('input.error').forEach(input => {
      input.classList.remove('error')
    })

    this.shadow.querySelector('form').reset()
    this.shadow.querySelector("[name='id']").value = ''
  }

  showElement = async element => {
    this.resetForm()

    Object.entries(element).forEach(([key, value]) => {
      if (this.shadow.querySelector(`[name="${key}"]`)) {
        const formElement = this.shadow.querySelector(`[name="${key}"]`)

        if (formElement.tagName.toLowerCase() === 'input') {
          if (formElement.type === 'radio') {
            const radioButton = this.shadow.querySelector(`[name="${key}"][value="${value}"]`)

            if (radioButton) {
              radioButton.checked = true
            }
          } else if (formElement.type === 'checkbox') {
            formElement.checked = !!value
          } else {
            formElement.value = value
          }
        }

        if (formElement.tagName.toLowerCase() === 'select') {
          formElement.querySelectorAll('option').forEach(option => {
            if (option.value === value) {
              option.selected = true
            }
          })
        }

        if (formElement.tagName.toLowerCase() === 'textarea') {
          formElement.value = value
        }
      }
    })
  }
}

customElements.define('sales-form-component', SalesForm)
