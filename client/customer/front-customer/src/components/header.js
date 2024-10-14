class Header extends HTMLElement {
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
      h1{
        padding: 0;
        margin: 0;
      }
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
    </style>
      <section>    
        <div class="container">
          <div class="title">
            <h1>Inicio</h1>            
          </div>
        </div>
      </section>
        `
  }
}

customElements.define('header-component', Header)
