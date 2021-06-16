const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const { prompt } = require("inquirer")
const path = require("path")
const fs = require("fs")

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, " team.html")

const render = require("./lib/htmlRenderer.js")
const team = []

const employee = [
  {
    type: 'input',
    name: 'name',
    message: 'Employee Name : '
  },
  {
    type: 'input',
    name: 'id',
    message: 'Employee Id : '
  },
  {
    type: 'input',
    name: 'email',
    message: 'Employee Email : '
  }
]
const manager = employee.concat([
  {
    type: 'input',
    name: 'officeNumber',
    message: 'Office Number : '
  }
])
const engineer = employee.concat([
  {
    type: 'input',
    name: 'github',
    message: 'Git Hub Username : '
  }
])
const intern = employee.concat([
  {
    type: 'input',
    name: 'school',
    message: 'School : '
  }
])

const createEmployee = () => {
  prompt([
    {
      type: 'list',
      name: 'employeePosition',
      message: 'Employee Position : ',
      choices: ['Manager', 'Engineer', 'Intern']
    }
  ])
    .then(({ employeePosition }) => {
      switch (employeePosition) {
        case 'Manager':
          createManager()
          break;
        case 'Engineer':
          createEngineer()
          break;
        case 'Intern':
          createIntern()
          break;
      }
    })

  const newEmployee = () => {
    prompt({
      type: 'confirm',
      name: 'cont',
      message: 'Another Team Member ? '
    })
      .then(({ cont }) => {
        if (cont) {
          prompt({
            type: 'list',
            name: 'type',
            message: 'Employee Position : ',
            choices: ['Manager', 'Engineer', 'Intern']
          })
            .then(({ type }) => {
              switch (type) {
                case 'Manager':
                  createManager()
                  break;
                case 'Engineer':
                  createEngineer()
                  break;
                case 'Intern':
                  createIntern()
                  break;
              }
            })
        } else {
          fs.writeFile(outputPath, render(team), err => {
            if (err) { console.log(err) }
            console.log('HTML Generated!')
          })
        }
      })
      .catch(err => console.log(err))
  }

  const createManager = () => {
    prompt(manager)
      .then(({ name, id, email, officeNumber }) => {
        team.push(new Manager(name, id, email, officeNumber))
        newEmployee()
      })
      .catch(err => console.log(err))
  }

  const createEngineer = () => {
    prompt(engineer)
      .then(({ name, id, email, github }) => {
        team.push(new Engineer(name, id, email, github))
        newEmployee()
      })
      .catch(err => console.log(err))
  }

  const createIntern = () => {
    prompt(intern)
      .then(({ name, id, email, school }) => {
        team.push(new Intern(name, id, email, school))
        newEmployee()
      })
      .catch(err => console.log(err))
  }
}

createEmployee()