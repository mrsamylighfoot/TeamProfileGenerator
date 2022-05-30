const Employee = require("../lib/Employee");

test("When I call the Employee class, it will create an instance object", () => {
  const instanceObject = new Employee();
  expect(typeof instanceObject).toBe("object");
});

test("When I call the getName method, I should see the employee's name", () => {
  const name = "Jodi";
  const newObj = new Employee(name);
  const newName = newObj.getName();
  expect(newName).toBe(name);
});
