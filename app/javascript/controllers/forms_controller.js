import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="forms"
export default class extends Controller {

  static targets = ["form"]

  connect() {
  }

  input(event) {

    const element = event.target
    this.validateInput(element)
  }

  submitStart(event) {

    console.log("submit start")

    var context = this
    var is_valid = true

    this.element.querySelectorAll('input[type="text"], input[type="date"]').forEach(function (item, index) {
      
      var result = context.validateInput(item)
      if (!result) {
        is_valid = result
      }
    })

    if (!is_valid) {
      event.detail.formSubmission.stop()
    }
  }

  validateInput(element) {

    var is_valid = true
    var errors = []

    if ( element.hasAttribute('data-required') ) {
      if (element.value.length <= 0) {
        is_valid = false
        errors.push("This field is required.")
      }
    }

    if (element.hasAttribute('data-max-length')) {
      const max_length = element.getAttribute('data-max-length')
      if ( element.value.length > max_length ) {
        is_valid = false
        errors.push("Maximum characters are "+max_length+".")
      }
    }

    if (element.hasAttribute('data-email')) {

      const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

      if (regex.test(element.value) == false) {
        is_valid = false
        errors.push("Invalid email address.") 
      }
    }

    if (element.hasAttribute('data-phone')) {

      var x = element.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      element.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')

      const regex = new RegExp(/^\d{3}-\d{3}-\d{4}$/)

      if (regex.test(element.value) == false) {
        is_valid = false
        errors.push("Invalid phone number.") 
      }
    }

    if (element.hasAttribute('data-date')) {

      console.log("date")
      console.log(element.value)

      const regex = new RegExp(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/)

      if (regex.test(element.value) == false) {
        is_valid = false
        errors.push("Invalid date format.") 
      }
    }

    const errors_id = element.getAttribute('data-errors-container')
    const errors_container = document.getElementById(errors_id)

    if (errors_container != null) {
      errors_container.innerHTML = ""

      if (is_valid) {
        errors_container.classList.add("hidden")
      } else {
        errors.forEach(function (item, index) {
          errors_container.innerHTML += "<p>"+item+"</p>"
          errors_container.classList.remove("hidden")
        })
      }
    }

    return is_valid
  }
}
