class Activate extends HTMLElement {
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
              color: hsl(0, 0%, 100%);
              font-family: "Ubuntu", sans-serif;
              width: 100%;
            }
            h2{
                color: hsl(0, 0%, 100%);
                font-size: 1.3rem;
                margin: 0;
                text-align:center;
            }
            
            ul li p {
              font-size: 1rem;
            }
            .form-element{
              padding: 0.5rem;
            }
            .form-element input{
              background-color: hsl(225, 63%, 65%);
              width: 100%;
            }
            .form-element button{
              align-items: center;
              background-color: hsl(272, 40%, 35%);
              border: 0;
              border-radius: 10PX;
              display: flex;
              font-size: 1em;
              font-weight: 700;
              gap: 1rem;
              justify-content: center;                 
              height: 30px;  
              margin-top: 1rem;            
              width: 100%;
            }

        </style>
        <section>
          <div class="pass-description">
            <h2>
              Elija una contraseña para su cuenta
            </h2>
            <ul>
              <li><p>8 caracteresa como mínimo</p></li>
              <li><p>Al menos una letra mayúscula</p></li>
              <li><p>Al menos un número</p></li>
            </ul>
          </div>
          <form>
            <div class="activate-form"> 
              <div class="activate-form-element">
                <div class="form-element">
                  <label for="user">Contraseña</label>                
                </div>
                <div class="form-element">
                  <input type="password" name="contraseña">
                </div>
              </div>
              <div class="activate-form-element">
                <div class="form-element">
                  <label for="password">Repita la Contraseña</label>                
                </div>
                <div class="form-element">
                  <input type="password" name="confirm-password">
                </div>
                <div class="form-element">
                  <button>Enviar</button>
                </div>
              </div>
            </div>
          </form>
        </section>
        `
  }
}

customElements.define('activate-component', Activate)
