 class StyleableFromOutsideElement extends HTMLElement {
    
    _adoptStylesheets() {
      let ss = document.querySelectorAll(`[type="text/css+shadow"][${this.tagName}]`)
      this.shadowRoot.querySelectorAll('[adopted]').forEach(el => { el.remove() })
      let t = [...ss].map((s) => {
              let copy = s.cloneNode(true)
              copy.type="text/css"
              return copy
            })
      this.shadowRoot.prepend(...t)
    }
  }  
    
    
  class MarkdownElement extends StyleableFromOutsideElement {
    // todo: properly reason about content
    constructor() {
      super()
      this.attachShadow({mode: 'open'})
    }
    connectedCallback() {
      this.shadowRoot.innerHTML = `
          ${marked(this.textContent)}
      `
      this._adoptStylesheets()
    }
  }  
  customElements.define('mark-down', MarkdownElement)  
    
    
  class ASCIIMathElement extends StyleableFromOutsideElement {
    // todo: properly reason about content
    constructor() {
      super()
      this.attachShadow({mode: 'open'})
    }
    connectedCallback() {
      this.shadowRoot.innerHTML = `
          ${ascii2mathml.ascii2mathml(this.textContent)}
      `
      this._adoptStylesheets()
    }
  }
    
  customElements.define('ascii-math', ASCIIMathElement)
  