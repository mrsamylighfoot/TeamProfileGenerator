const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Employee = require("./lib/Employee");
const makePage = require("./src/page-template");

const distFolder = path.resolve("__dirname", "dist");
const distPath = path.join(distFolder, "employee.html");

const startApp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's your name?",
      },
      {
        type: "input",
        name: "email",
        message: "What's your email?",
      },
      {
        type: "input",
        name: "id",
        message: "What's your ID?",
      },
    ])
    .then((res) => {
      console.log(res);
      const newEmployee = new Employee(res.name, res.id, res.email);
      fs.writeFileSync("./dist.employee.html", makePage(newEmployee), "utf-8");
    });
};

startApp();
