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
      header{
        background-color: hsl(0, 0%, 0%);
        display: flex;
        justify-content: space-between;
        padding: 0.75rem ;
      }
    </style>
      <header>    
        <slot></slot> 
      </header>
     `
  }
}

customElements.define('header-component', Header)
