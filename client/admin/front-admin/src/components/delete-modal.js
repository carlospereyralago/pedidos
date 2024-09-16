import { store } from '../redux/store.js'
import { refreshTable, showFormElement } from '../redux/crud-slice.js'

class DeleteModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('showDeleteModal', this.handleShowDeleteModal.bind(this))

    this.render()
  }

  handleShowDeleteModal (event) {
    this.endpoint = event.detail.endpoint
    this.element = event.detail.element
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
          gap: 1rem;      
          height: 150px;
          justify-content: center;
          margin: 1rem;
          padding: 1rem;
          width: 400px;
          border-radius:20px;
        }

        .container_msg{
          display: flex;  
          gap: 1rem;
        }
        .container_msg p.msg {
          align-items: center;
          color:hsl(240deg 79.49% 22.94%);
          display: flex;
          font-family: ubuntu;
          text-align: center;      
        }
        .container_btn{
          display: flex;
          gap: 2rem;
          justify-content: space-around;
          
        }
        .cancel , .delete{
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

        .cancel:hover , .delete:hover{      
          background-color: #b57beb;
          color: #fff; 
        }
      </style>

      <section id="modal">
        <div class="container">
          <div class="container_msg">
            <p class="msg"> Estas Seguro de querer eliminar este dato</p>
          </div>
          <div class="container_btn">
            <div class="container_btn_cancel">
              <button class="cancel">Cancelar</button>
            </div>
            <div class="container_btn_delete">
              <button class="delete">Eliminar</button>
            </div>
          </div>
        </div>
      </section>
        `
    // Seleccionar elementos
    const modal = this.shadow.getElementById('modal')
    const cancelButton = this.shadow.querySelector('.cancel')
    const deleteButton = this.shadow.querySelector('.delete')

    // Evento para remover la clase "active" al hacer clic en "Cancelar"
    cancelButton.addEventListener('click', () => {
      modal.classList.remove('active')
    })

    deleteButton.addEventListener('click', async () => {
      await fetch(this.element, {
        method: 'DELETE'
      })

      store.dispatch(refreshTable(this.endpoint))

      const formElement = {
        data: null
      }
      store.dispatch(showFormElement(formElement))

      document.dispatchEvent(new CustomEvent('message', {
        detail: {
          message: 'Elemento eliminado correctamente',
          type: 'success'
        }
      }))

      modal.classList.remove('active')
    })
  }
}

customElements.define('delete-modal-component', DeleteModal)
