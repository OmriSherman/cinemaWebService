const fs = require('fs');
const jfile = require('jsonfile')

var writeToFile = (obj) => {
    return new Promise(async(resolve, reject) => {
      let file = await jfile.readFile("./permissions.json");
      file.permissions.push(obj);
      jfile.writeFile("./permissions.json", file, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("permission added");
        }
      });
    });
  };
  
  var readFromFile = () => {
    return new Promise((resolve, reject) => {
      jfile.readFile("./permissions.json", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
  
  var getPermissionById = (id) => {
    return new Promise(async (resolve, reject) => {
      let file = await jfile.readFile("./permissions.json");
  
      let userData = file.permissions.find(user => user.id == id)
      if (userData) {
        resolve(userData);
      } else {
        reject("user not found");
      }
    });
  };

  var deleteFromFile = (id) => {
    return new Promise( async(resolve, reject)=> {
      let file = await jfile.readFile("./permissions.json");
      const currUser = (user => user.id == id)
      let index = file.permissions.findIndex(currUser);
      file.permissions.splice(index,1);
      jfile.writeFile("./permissions.json", file, (err) => {
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
      let file = await jfile.readFile("./permissions.json");
      const currUser = (user => user.id == id)
      let index = file.permissions.findIndex(currUser);
       file.permissions.splice(index,1,newData);
       jfile.writeFile("./permissions.json", file, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("user updated");
        }
      });
    })
  }
  module.exports = { readFromFile, writeToFile, getPermissionById, deleteFromFile, updateUserFromFile };
  
