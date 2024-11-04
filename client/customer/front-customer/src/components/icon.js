class Icon extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.icons = {
      home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>',
      backButton: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left-bold</title><path d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" /></svg>'
    }
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
            *{
                box-sizing: border-box;
            }

            svg{
              fill: hsl(0, 0%, 100%);
              height: 1.5rem;
              width: 1.5rem;
            }
        </style>

        <div class="icon">
            ${this.icons[this.getAttribute('icon')]}
        </div>
        `
  }
}

customElements.define('icon-component', Icon)
