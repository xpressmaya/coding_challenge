import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="employments"
export default class extends Controller {
  connect() {
  }

  addEmploymentRecord(event){
    console.log("Add Employment Record")
  }
}
