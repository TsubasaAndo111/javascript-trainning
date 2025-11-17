customElements.define(
  "inline-circle",
  class InlineCircle extends HTMLElement {
    connectedCallback() {
      this.style.display = "inline-block";
      this.style.borderRadius = "50%";
      this.style.borderStyle = "solid";
      this.style.borderWidth = "2px";
      this.style.transform = "translateY(10%)";

      if (!this.style.width) {
        this.style.width = "0.8em";
        this.style.height = "0.8em";
      }
    }

    static get observedAttributes() {
      return ["diameter", "color", "border-color"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log("attributeChangedCallback:", name, oldValue, "→", newValue);
      switch (name) {
        case "diameter":
          this.style.width = newValue;
          this.style.height = newValue;
          break;
        case "color":
          this.style.backgroundColor = newValue;
          break;
        case "border-color":
          console.log("border-color");
          console.log(this.style.borderColor);
          this.style.borderColor = newValue;
          console.log(this.style.borderColor);
          break;
      }
    }
    get diameter() {
      return this.getAttribute("diameter");
    }
    set diameter(diameter) {
      this.setAttribute("diameter", diameter);
    }
    get color() {
      return this.getAttribute("color");
    }
    set color(color) {
      this.setAttribute("color", color);
    }
    get borderColor() {
      return this.getAttribute("border-color");
    }
    set borderColor(borderColor) {
      this.setAttribute("border-color", borderColor);
    }
  }
);
