# Quest Game

This project is to enable a very flexible quest-completion game where the main infrastructure is a simple message
receiver that sends actions to a central reducer-style store. Pluggable modules will have the opportunity to process
the action messages and update their state. One module defines one quest.

Everything is stored in a central Game class.

Code is organized according to Clean Architecture, with numbered directories to make the hierarchy easier to see.

Tech stack is TypeScript with Jest for unit testing.

`npm test` to run the unit tests and see coverage stats.
