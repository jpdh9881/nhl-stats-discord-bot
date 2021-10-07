const models = require("./command_models");

const verifyCommand = (command, args) => {
   const model = models[command];
   console.log(args);
   if (args.length === 0 || ["-h", "h", "-help", "help"].includes(args[0])) {
      return "help";
   }

   let argsIndex = 0;
   let placeInModel = model.next;
   while (placeInModel) {
      const arg = args[argsIndex];
      const argName = Object.keys(placeInModel)[0];
      if (placeInModel[argName].verify) {
         // - there's a first-class verify function associated with this option
         if (!placeInModel[argName].verify(arg)) {
            return false;
         }
         placeInModel = placeInModel[argName].next; // essentially: stepping further down the tree
      } else {
         if (arg && arg.startsWith("-")) {
            // - verify based on if key is in object (arg is a -switch)
            if (!placeInModel[argName][arg]) {
               return false;
            }
            placeInModel = placeInModel[argName][arg].next; // essentially: step further down the tree (recursion by object reference???? dunno)
         } else {
            // - verify based on if arg can be verified by a child's verify function (this option takes multiple argument types)
            let argType; // if an argument is "verified" by a child, the argType will become the name of that option, allowing us to step further down the object ree
            for (const [key, value] of Object.entries(placeInModel[argName])) {
               if (key === "undefined") {
                  if (arg === undefined) {
                     return true;
                  }
               } else {
                  if (value.verify(arg)) {
                     argType = key;
                  }
               }
            }
            if (argType) {
               placeInModel = placeInModel[argName][argType].next // step further down the tree
            } else {
               return false;
            }
         }
      }
      argsIndex++;
   }

   return true;
};

module.exports = verifyCommand;