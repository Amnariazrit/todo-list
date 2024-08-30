#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todos: string[] = [];
let condition = true;

console.log(
  chalk.blueBright.bold.underline(
    "\n \t Welcome To CLI Based Todo-List Application\n"
  )
);

// while (condition) {
//   const addTask = await inquirer.prompt([
//     {
//       name: "todo",
//       message: chalk.green("What you want to add in your todos?"),
//       type: "input",
//     },

//     {
//       name: "addMore",
//       message: chalk.green("Do you want to add more task?"),
//       type: "confirm", //When type is confirm answer is in yes or no
//       default: "true",
//     },
//   ]);
//   todos.push(addTask.todo);

//   condition = addTask.addMore;
//   console.log(todos);
// }

// // Updated Todo-list in an array
// console.log("\n Your updated Todo-list in an array:", todos);

// // todos.splice(2,1);
// // // After removing an element
// // console.log("\n After removing an element:", todos);

// // // After adding a new element on 3rd position
// // todos.splice(3,0,"green")
// // console.log("\n Adding a new element on 3rd position:", todos);

// // Todo-list without an array
// // console.log(chalk.blueBright.bold.underline("\n \t Todo-list \n"));

// // todos.forEach((item) => {
// //   console.log(chalk.cyan(item));
// // });

let main = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option you want to do:",
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Todo-List",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await deleteTask();
    } else if (option.choice === "Update Task") {
      await updateTask();
    } else if (option.choice === "View Todo-List") {
      await viewTask();
    } else if (option.choice === "Exit") {
      condition = false;
    }
  }
};

// Function to add new task to the list
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.green("Enter your task:"),
    },
  ]);
  todos.push(newTask.task);
  console.log(`\n ${newTask.task} task added successfully in Todo-List.`);
};

// Function to view all Todo-List Tasks
let viewTask = () => {
  console.log(chalk.blue.bold.underline("\n Your Todo-List: \n"));
  todos.forEach((task, index) => {
    console.log(chalk.cyanBright(`${index + 1}: ${task}`));
  });
};

// Function to delete a task from the list
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.green(
        "Enter the index number of the task you want to delete:"
      ),
    },
  ]);
  let deletedTask = todos.splice(taskIndex.index - 1, 1);
  console.log(
    `\n ${deletedTask} this task has been deleted successfully from your Todo-List.`
  );
};

// Function to update Todo-List
let updateTask = async () => {
  await viewTask();
  let updateTaskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.green(
        "Enter the index number of the task you want to update:"
      ),
    },
    {
      name: "new_task",
      type: "input",
      message: chalk.green("Now enter new task:"),
    },
  ]);
  todos[updateTaskIndex.index - 1] = updateTaskIndex.new_task;
  console.log(
    `\n Task at index no.${updateTaskIndex.index - 1} updated successfully.`
  );
};
main();
