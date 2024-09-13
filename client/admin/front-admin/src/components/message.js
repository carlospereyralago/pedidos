class Message extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('message', this.handleShowMessage.bind(this))
    this.render()
  }

  handleShowMessage (event) {
    this.shadow.querySelector('section').classList.add('active')
    this.shadow.querySelector('p').textContent = event.detail.message
    this.shadow.querySelector('.container-header').classList.add(event.detail.type)

    setTimeout(() => {
      this.shadow.querySelector('section').classList.remove('active')
    }, 3000)
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        *{
            box-sizing: border-box;
        }

        section{
          align-items: end;
          display: flex; 
          flex-direction: column; 
          z-index: 1000;
          position: fixed;
          width: 100%;
          justify-content: flex-end;
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
          height: 150px;
          justify-content: center;
          margin: 1rem;
          padding: 1rem;
          width: 400px;
          border-radius:20px;
        }

        .container-header{
          padding: 1rem;
          width: 100%;
        }

        .container-header.success{
          background-color: green;
        }

        .container-header.error{
          background-color: red;
        }

        .container-message{
          display: flex;  
          gap: 1rem;
        }

        .container-message p {
          align-items: center;
          color:hsl(240deg 79.49% 22.94%);
          display: flex;
          font-family: ubuntu;
          text-align: center;      
        }
        
      </style>

      <section>
        <div class="container">
          <div class="container-header"></div>
          <div class="container-message">
            <p class="message"></p>
          </div>
        </div>
      </section>
        `
  }
}

customElements.define('message-component', Message)
