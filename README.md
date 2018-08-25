# rpi_sprinkler
Sprinler control system using a Raspberry Pi 3B+ and a 16 channel relay system.

## For Reference

### libraries used

#### server

##### Development mode only

**nodemon**, to detect file changes to recompile node app.

**concurrently**, to execute both node and react applications without usin seperate terminals.

##### All modes

**sqlite3**, relation SQL database since mongo is limited on the reaspberry pi.

**express**, minimalist web framework.
