
class MyCounter extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		
	}

	get count() {
		return this.getAttribute("count");
	}

	set count(val) {
		this.setAttribute("count", val);
	}

	static get observedAttributes() {
		return ["count"];
	}

	increment() {
		this.count++;
	}

	attributeChangedCallback(attr, oldVal, newVal) {
		switch (attr) {
			case "count":
				this.render();
				break;
			default:
				console.log("default");
		}
	}

	connectedCallback() {
		this.render();
		
	}

	disconnectedCallback() {
		console.log("when component unmount");
	}

	render() {
    this.shadow.innerHTML = `
      <template id="template1">
        <p>template node</p>
      </template>

			<div id="container">
				<h1>Counter</h1>
        <p>count： ${this.count}</p>
        <button id="btn">Increment</button>
				<slot></slot>
				<slot name="define"></slot>
			</div>
    `;
    const btn = this.shadow.querySelector("#btn");
    btn.addEventListener("click", this.increment.bind(this));

    const template = this.shadow
    .querySelector("#template1").content.cloneNode(true);
    this.container = this.shadow.querySelector("#container");
		this.container.appendChild(template);
		
		console.log(
			"slot---",
			this.shadow.querySelector('slot[name="define"]').assignedElements()
		);
	}
}

customElements.define("my-counter", MyCounter);