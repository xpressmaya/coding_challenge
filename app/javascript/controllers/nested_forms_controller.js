import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="nested-forms"
export default class extends Controller {
  connect() {
  }

  static targets = ["add_item", "template"]

  add_association(event) {
    event.preventDefault()
    var content = this.templateTarget.innerHTML.replace(/TEMPLATE_RECORD/g, new Date().valueOf())
    this.element.querySelector("#fields-container").insertAdjacentHTML('beforebegin', content)
  }

  remove_association(event) {
    event.preventDefault()
    let item = event.target.closest(".nested-fields")
    item.remove()
  }
}
