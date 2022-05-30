const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Employee = require("./lib/Employee");
const makePage = require("./src/page-template");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const distFolder = path.resolve(__dirname, "dist");
const distPath = path.join(distFolder, "employee.html");

const teamMembers = [];
const idArray = [];

const startApp = () => {
  function createManager() {
    console.log(
      "Welcome to the Team Profile Generator! Please build your team"
    );
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the name of the team manager?",
        },
        {
          type: "input",
          name: "managerId",
          message: "What the is ID of the team manager?",
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the email address for the team manager?",
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is the office number for the team manager?",
        },
      ])
      .then((res) => {
        const manager = new Manager(
          res.managerName,
          res.managerId,
          res.managerEmail,
          res.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(res.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberType",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "None. I have added all team members.",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberType) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is the name of the engineer?",
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is the id of the engineer?",
        },

        {
          type: "input",
          name: "engineerEmail",
          message: "What is the email of the engineer?",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is the Github username for the engineer?",
        },
      ])
      .then((res) => {
        const engineer = new Engineer(
          res.engineerName,
          res.engineerId,
          res.engineerEmail,
          res.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(res.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is the name of the intern?",
        },
        {
          type: "input",
          name: "internId",
          message: "What is the id of the intern?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is the email address for the intern?",
        },
        {
          type: "input",
          name: "internSchool",
          message: "What school does the intern attend?",
        },
      ])
      .then((res) => {
        const intern = new Intern(
          res.internName,
          res.internId,
          res.internEmail,
          res.internSchool
        );
        teamMembers.push(intern);
        idArray.push(res.internId);
        createTeam();
      });
  }

  function buildTeam() {
    if (!fs.existsSync(distFolder)) {
      fs.mkdirSync(distFolder);
    }
    fs.writeFileSync(distPath, render(teamMembers), "utf-8");
  }

  createManager();
};

startApp();
