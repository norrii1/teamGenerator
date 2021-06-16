const Employee = require("./Employee")

class Manager extends Employee {
  constructor(name, id, email, officenumber) {
    super(name, id, email)
    this.officeNumber = officenumber
  }

  getOfficeNumber() {
    return this.officeNumber
  }

  getRole() {
    return this.constructor.name
  }
}

module.exports = Manager