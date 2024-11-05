class Notfound extends HTMLElement {
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

            section{
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
            .error{               
                align-items: center;
                display: flex;
                gap: 0.5rem;
            } 
            H1{
              color:#fff;
              font-size: 5em;
            }
            .error-message{               
                align-items: center;
                display: flex;
                gap: 0.5rem;
            }   
            .error-message p{
              color:#fff;
              font-family: ubuntu;
              font-size: 2em;
            }
            
        </style>
        <section>
            <div class="error">
                <h1>Error 404</h1>
            </div>
            <div class="error-message">
                <p>Lo sentimos, no hemos podido encontrar la pagina que buscabas. Busca en el menu la opcion que deseas.</p>
            </div>
        </section>
        `
  }
}

customElements.define('notfound-component', Notfound)
