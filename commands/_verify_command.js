const models = require("../models/commands");

const verifyCommand = (command, args) => {
   const model = models[command];

   let argsIndex = 0;
   let placeInModel = model.next;
   while (placeInModel) {
      console.log(argsIndex, placeInModel);
      const arg = args[argsIndex];
      console.log(arg);
      const argName = Object.keys(placeInModel)[0]; // there will only ever be 1!
      if (placeInModel[argName].verify) {
         // there's a verify function
         if (!placeInModel[argName].verify(arg)) {
            console.log("verify1");
            return false;
         }
         placeInModel = placeInModel[argName].next; // essentially: stepping further down the tree
      } else {
         // verify based on if key is in object
         if (!placeInModel[argName][arg]) {
            console.log("verify2");
            return false;
         }
         placeInModel = placeInModel[argName][arg].next; // essentially: stepping further down the tree
      }
      argsIndex++;
   }
   console.log(placeInModel);
   return true;
};

module.exports = verifyCommand;