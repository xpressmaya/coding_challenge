import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="turbo-modal"
export default class extends Controller {

  static targets = ["remote_modal"]

  hideModal(){
    this.element.parentElement.removeAttribute("src")
    this.element.remove()
  }

  submitEnd(event){
    if (event.detail.success){
      this.hideModal()
    }
  }
}
