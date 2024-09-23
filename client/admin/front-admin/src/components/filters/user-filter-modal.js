import { store } from '../../redux/store.js'
import { applyFilter } from '../../redux/crud-slice.js'

class UsersFilterModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('showFilterModal', this.handleShowFilterModal.bind(this))
    this.render()
  }

  handleShowFilterModal (event) {
    this.shadow.querySelector('section').classList.add('active')
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        *{
            box-sizing: border-box;
        }

        section{
          align-items: center;
          background-color: hsla(0, 0%, 0%, 50%);
          display: flex; 
          flex-direction: column; 
          z-index: 1000;
          position: fixed;
          width: 100%;
          justify-content: center;
          top: 0;
          left: 0;
          height: 100%;
          opacity: 0;
          transition: opacity 0.4s;
          visibility: hidden;
        }

        section.active{
          opacity: 1;
          visibility: visible;
        }
        
        .container{
          background-color: #839de5;
          border: 0.25rem solid #551A8B;
          font-weight: 700;
          display:flex;
          flex-direction: column; 
          gap: 1rem;      
          justify-content: center;
          margin: 1rem;
          padding: 1rem;
          width: 400px;
          border-radius:20px;
        }

        .container_msg{
          display: flex;  
          gap: 1rem;
          width: 100%;
        }

        .container_msg p.msg {
          align-items: center;
          color:hsl(240deg 79.49% 22.94%);
          display: flex;
          font-family: ubuntu;
          text-align: center;
          justify-content:center;     
          width: 100%; 
        }

        .container_btn{
          display: flex;
          gap: 2rem;
          justify-content: space-around;
        }

        form{
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-element-input input{
          width: 100%;
        }

        .cancel , .filter{
          align-items: center;
          background-color: #551A8B;
          border:none;
          border-radius: 10PX;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-family: ubuntu;
          font-size: 1em;
          font-weight: 500;
          gap: 1rem;
          justify-content: center;         
          height: 30px;        
          padding: 0.5rem;
          transition-duration: 0.4s;
          width: 100%;
        }

        .cancel:hover , .filter:hover{      
          background-color: #b57beb;
          color: #fff; 
        }
      </style>

      <section id="modal">
        <div class="container">
          <div class="container_msg">
            <p class="msg"> Filtrar datos de la tabla</p>
          </div>
          <form>
            <div class="form-element">
              <div class="form-element-label">
                <label>Nombre</label>
              </div>
              <div class="form-element-input">
                <input type="text" name="name">
              </div>
            </div>
            <div class="form-element">
              <div class="form-element-label">
                <label>Email</label>
              </div>
              <div class="form-element-input">
                <input type="text" name="email">
              </div>
            </div>
          </form>
          <div class="container_btn">
            <div class="container_btn_cancel">
              <button class="cancel">Cancelar</button>
            </div>
            <div class="container_btn_delete">
              <button class="filter">Filtrar</button>
            </div>
          </div>
        </div>
      </section>
        `
    // Seleccionar elementos
    const cancelButton = this.shadow.querySelector('.cancel')
    const filterButton = this.shadow.querySelector('.filter')

    // Evento para remover la clase "active" al hacer clic en "Cancelar"
    cancelButton.addEventListener('click', () => {
      this.shadow.getElementById('modal').classList.remove('active')
    })

    filterButton.addEventListener('click', async (event) => {
      event.preventDefault()
      const form = this.shadow.querySelector('form')
      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const queryString = Object.entries(formDataJson).map(([key, value]) => {
        return `${key}=${value}`
      }).join('&')

      store.dispatch(applyFilter(queryString))

      this.shadow.getElementById('modal').classList.remove('active')
    })
  }
}

customElements.define('user-filter-modal-component', UsersFilterModal)
