class Main extends HTMLElement {
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

            main{
              display: flex;
              flex-direction: column;
              padding: 1rem;
            }
        </style>
        <main>
            <slot></slot>
        </main>
        `
  }
}

customElements.define('main-component', Main)
