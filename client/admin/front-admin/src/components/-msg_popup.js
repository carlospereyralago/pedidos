class MsgPopUp extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()

    // Escuchar el evento click de los botones
    this.shadow.querySelector('.cancel').addEventListener('click', () => {
      // Disparar el evento de cancelar
      this.dispatchEvent(new CustomEvent('cancel-delete', { bubbles: true, composed: true }))
    })

    this.shadow.querySelector('.delete').addEventListener('click', () => {
      // Disparar el evento de confirmación
      this.dispatchEvent(new CustomEvent('confirm-delete', { bubbles: true, composed: true }))
    })
  }

  render () {
    this.shadow.innerHTML = `
      <style>
        *{
          box-sizing: border-box;
        }
      
        .container{
          display: flex; 
          flex-direction: column; 
          gap: 1rem;
          justify-content: center;
          height: 200px;
          margin: 5px;
          width: 200px;
        }
        .container_msg{
          display: flex;  
          gap: 1rem;
        }
        .container_msg p.msg {
          align-items: center;
          color: hsl(0, 0%, 100%);
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
          cursor: pointer;
          display: flex;
          gap: 1rem;
          justify-content: center;
          font-family: ubuntu;
          width: 100%;
          background-color: #FFF;
          border: 0;
          border-radius: 10px;
          height: 30px;
          align-items: center;
          font-size: 1em;
          color: #551A8B;
          font-weight: 700;
          padding: 0.5rem;
        }
      </style>
      <section>
        <div class="container">
          <div class="container_msg">
            <p class="msg">¿Estás seguro de querer eliminar este dato?</p>
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
  }
}

customElements.define('msj-popup', MsgPopUp) // Cambié el nombre para coincidir con la importación en tabla.js
