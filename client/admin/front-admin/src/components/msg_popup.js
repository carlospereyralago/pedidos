class MsgPopUp extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
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
        WIDTH: 100%;
        BACKGROUND-COLOR: #FFF;
        BORDER: 0;
        BORDER-RADIUS: 10PX;
        HEIGHT: 30PX;
        ALIGN-ITEMS: center;
        font-size: 1em;
        color: #551A8B;
        font-weight: 700;
        padding: 0.5rem;
      }
  </style>
  <section>
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
  }
}

customElements.define('menu-component', MsgPopUp)
