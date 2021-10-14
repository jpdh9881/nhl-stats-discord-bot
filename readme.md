# Description

A Discord bot that fetches NHL-related data.
Thanks to Drew Hynes for documenting the undocumented NHL API (https://gitlab.com/dword4/nhlapi)

## Overview

Commands and routes:
- ? ("entry point")
  - ? -list                                     (list all commands)
- ?draft
  - ?draft {draftYear} -round {roundNum}        (list all draft picks in given round from given year)
  - ?draft {draftYear} -pick {pickNum}          (get given overall pick in given year)
- ?player
  - ?player {playerId} -info                    (get general info about a player)
  - ?player {playerId} -stats                   (get current year stats about a player)
- ?prospect
  - ?prospect {prospectId}                      (get general info about a prospect)
- ?schedule
  - ?schedule -today                            (get today's schedule, all teams)
  - ?schedule {YYYY-MM-DD}                      (get given day's schedule, all teams)
  - ?schedule {teamCode} {YYYY-MM-DD}           (get given day's schedule for team)
  - ?schedule {teamCode} {YYYY-MM}              (get given month's schedule for team)
  - ?schedule {teamCode} -next                  (get next game for team)
  - ?schedule {teamCode} -today                 (get today's schedule for team)
  - ?schedule {teamCode} -month                 (get current months' schedule for team)
- ?team
  - ?team {teamCode} -info                      (get general info about team)
  - ?team {teamCode} -roster                    (list roster of team)
  - ?team {teamCode} -stats                     (get stats about team)
- ?teams
  - ?teams -list                                (list teams and team codes)

- playerIds can be found with "?team {teamCode} -roster"
- prospectIds can be found with ?draft {draftYear} -round {roundNum}

Help:
- ?{command} -h
- ?{command} -help
- will list all routes and general information about a command

## Code Organization

- bot.js = the main file, where the bot is set up

- command_register.js = where commands are registered and made available to the bot
    (where command labels are mapped to command identifiers)
  - /commands/
    - {identifier}.js = where a command is defined (with routes, help messages, etc.)
    - verify_arguments.js = where any {arguments} in a route are defined/verified (via function)
    - match_route.js = function which matches a user's arguments to a route
    - api_calls/ = where functions connected to routes are defined

- a "command" represents the general type of information being delivered
- a "route" represents a combination of arguments attached to a command that delivers a discrete type of info/data
  - route arguments can be of two types:
    - {arg} : an arg type that is verified/matched by a function
      - this function is used for route matching
    - -switch: an enumerated option prepended by a dash

## Statement of Bias

Go Leafs Go