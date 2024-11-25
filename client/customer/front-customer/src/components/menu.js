class Menu extends HTMLElement {
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
      section{
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .container{
        display: flex;
        flex-direction: column;      
      }
      .title{      
        align-items: center;
        background-color: hsl(0deg 0% 0%);
        display: flex;
        height: 3rem;
        gap: 1rem;
      }
      .title h1{
        display: flex;
        color:hsl(0, 0%, 100%);
        font-family: ubuntu;
        gap: 2rem;
        justify-content: center;
        padding: 0.5rem;
        font-weight: 700;
        padding-left: 1rem;s
      }
      .title-icon{
        display: flex;
        height: 1.8rem;
      }
      .title-icon svg{
        cursor:pointer;
        fill: hsl(0, 0%, 100%);
        height: 2rem;
        width: 2rem;
      }
      
      .container_button{
        cursor:pointer;
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 30px;
        width: 100%;
        
      }
      .button_New_order, .button_prev_order{
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
      .button_New_order:hover, .button_prev_order:hover{
        background-color: hwb(0deg 70% 25%);
      }
    </style>
      <section>    
        <div class="container">
          <div class="container_button">
            <button class="button_New_order">Nuevo pedido</button>
          </div>
          <div class="container_button">
            <button class="button_prev_order">Pedidos anteriores</button>
          </div>
          
    
        </div>
      </section>
        `
    this.shadow.querySelector('.button_New_order').addEventListener('click', () => {
      window.location.href = 'https://dev-pedidos.com/cliente/nuevo-pedido'
    })
    this.shadow.querySelector('.button_prev_order').addEventListener('click', () => {
      window.location.href = 'https://dev-pedidos.com/cliente/pedidos-anteriores'
    })
  }
}

customElements.define('menu-component', Menu)
