const verifyArgType = require("./arg_type_verification");

/**
 * Matches a user's arguments string with a route, if any
 * @param {string} command
 * @param {string} userArgs
 * @returns {string, array} route / [ errorType, errorMsg ]
 */
const matchRoute = (routes, userArgs) => {
   const userArgsArray = userArgs.split(" ");
   let routesOfSameLength = routes.filter(route => {
      if (route.getArray().length === userArgsArray.length) {
         return true;
      }
   });

   if (routesOfSameLength.length === 0) {
      return ["too-many-args"];
   }

   let argNum = 0;
   // We want to eliminate all the routes which don't apply
   while (routesOfSameLength.length > 0 && argNum < userArgsArray.length) {
      const userArg = userArgsArray[argNum];

      for (const [routeNum, route] of routesOfSameLength.entries()) {
         const arg = route.getArg(argNum);

         if (arg === "" && userArg === "") {
            // No args

            return routesOfSameLength[routeNum];
         } else if (arg.startsWith("{")) {
            // Arg which must correspond to a {type}

            // - is user's arg of this {type}?
            if (verifyArgType[arg](userArg)) {
               // yes: remove all routes which don't correspond to this {type} at this position in the route
               routesOfSameLength = routesOfSameLength.filter(r => r.getArg(argNum) === arg);
               // there is only one route left && we have checked ALL user arguments? => this is our route
               if (routesOfSameLength.length === 1 && argNum === userArgsArray.length - 1) {
                  return routesOfSameLength[0];
               }
               argNum++;
            } else {
               // no: remove all routes which share this {type} at this position in the route
               routesOfSameLength = routesOfSameLength.filter(r => r.getArg(argNum) !== arg);
            }
            break;
         } else if (arg.startsWith("-")) {
            // Enumerated arg / switch arg

            // - does user's arg match this route's -switch value?
            if (userArg === arg) {
               // yes: remove all routes which don't have this -switch value at this position
               routesOfSameLength = routesOfSameLength.filter(r => r.getArg(argNum) === arg);
               // there is only one route left && we have checked ALL user arguments? => this is our route
               if (routesOfSameLength.length === 1 && argNum === userArgsArray.length - 1) {
                  return routesOfSameLength[0];
               }
               argNum++;
            } else {
               // no: remove all routes which have this -switch value at this position
               routesOfSameLength = routesOfSameLength.filter(r => r.getArg(argNum) !== arg);
            }
            break;
         } else {
            routesOfSameLength = routesOfSameLength.filter(r => r.getArg(argNum) !== arg);
         }
      }
   }

   return ["arg", userArgsArray[argNum]];
};

// console.log(matchRoute("draft", ""));
// console.log(matchRoute("draft", "2020 -round"));
// console.log(matchRoute("draft", "1988 -round 4"));
// console.log(matchRoute("draft", "1977 -pick"));
// console.log(matchRoute("draft", "1969 -pick 110"));
// try { console.log(matchRoute("draft", "hi -round")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("draft", "2020 -thing")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("draft", "2020 -round WHAT")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("draft", "2020 -pick WHAT")) } catch(e) { console.log("Error:", e); }

// console.log(matchRoute("player", "12355"));
// console.log(matchRoute("player", "12341235 -info"));
// console.log(matchRoute("player", "12341234 -stats"));
// try { console.log(matchRoute("player", "")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("player", "bum")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("player", "1234123 -THING")) } catch(e) { console.log("Error:", e); }

// console.log(matchRoute("prospect", "12355"));
// try { console.log(matchRoute("prospect", "")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("prospect", "BUMS")) } catch(e) { console.log("Error:", e); }

// console.log(matchRoute("schedule", ""));
// console.log(matchRoute("schedule", "TOR"));
// console.log(matchRoute("schedule", "TOR 2021-09-11"));
// console.log(matchRoute("schedule", "2021-09-11"));
// try { console.log(matchRoute("schedule", "BUMS")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("schedule", "TOR 100-11-12")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("schedule", "100-11-12")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("schedule", "JAYS")) } catch(e) { console.log("Error:", e); }

// console.log(matchRoute("team", "TOR"));
// console.log(matchRoute("team", "TOR -info"));
// console.log(matchRoute("team", "TOR -roster"));
// console.log(matchRoute("team", "TOR -stats"));
// try { console.log(matchRoute("team", "")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("team", "BUMS")) } catch(e) { console.log("Error:", e); }
// try { console.log(matchRoute("team", "TOR -THING")) } catch(e) { console.log("Error:", e); }

module.exports = matchRoute;