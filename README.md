# rpi_sprinkler
Sprinler control system using a Raspberry Pi 3B+ and a 16 channel relay system.

## For Reference

### libraries used

#### server

##### Development mode only

**nodemon**, to detect file changes to recompile node app.

**concurrently**, to execute both node and react applications without usin seperate terminals.

**expect**, testing framework matchers.

**mocha**, testing framework.

##### All modes

**sqlite3**, relation SQL database since mongo is limited on the reaspberry pi.

**cron**, task scheduler.

**moment**, a date/time library.

**express**, minimalist web framework.

**socket.io**, real time async commnications.

#### client

##### All modes

**socket.io-client**, client side socket.io.
