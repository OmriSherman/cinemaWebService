const fs = require("fs");
const jfile = require("jsonfile");

var writeToFile = (obj) => {
  return new Promise(async (resolve, reject) => {
    let file = await jfile.readFile("./users.json");
    file.users.push(obj);
    jfile.writeFile("./users.json", file, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("user added");
      }
    });
  });
};

var readFromFile = () => {
  return new Promise((resolve, reject) => {
    jfile.readFile("./users.json", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

var getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    let file = await jfile.readFile("./users.json");

    let userData = file.users.find(user => user.id == id)
    console.log(userData);
    if (userData) {
      resolve(userData);
    } else {
      reject("user not found");
    }
  });
};

var deleteFromFile = (id) => {
  return new Promise( async(resolve, reject)=> {
    let file = await jfile.readFile("./users.json");
    const currUser = (user => user.id == id)
    let index = file.users.findIndex(currUser);
    file.users.splice(index,1);
    jfile.writeFile("./users.json", file, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("user deleted");
      }
    });
  })
}

var updateUserFromFile = (id, newData) => {
  return new Promise( async(resolve, reject)=> {
    let file = await jfile.readFile("./users.json");
    const currUser = (user => user.id == id)
    let index = file.users.findIndex(currUser);
     file.users.splice(index,1,newData);
     jfile.writeFile("./users.json", file, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("user updated");
      }
    });
  })
}

module.exports = { readFromFile, writeToFile, getUserById, deleteFromFile, updateUserFromFile };
