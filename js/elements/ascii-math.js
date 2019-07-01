class ASCIIMathElement extends HTMLElement {
  // todo: properly reason about content
  updateMathMLOutput() {
    this.shadowRoot.innerHTML = ascii2mathml.ascii2mathml(this.textContent)
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.mo = new MutationObserver((recs) => {
      this.updateMathMLOutput();
    })
    this.mo.observe(this, { characterData: true, childList: true, attributes: true })
  }
  connectedCallback() {
    this.updateMathMLOutput()
  }
}

customElements.define('ascii-math', ASCIIMathElement)
  