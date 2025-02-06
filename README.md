# Cat Image Server

This project is a simple Node.js server that serves random cat images and interacts with an SQLite database.

## Project Structure

- `app.js`: The main server file.
- `image/`: Directory containing cat images.
- `insertData.js`: Script to insert data into the SQLite database.
- `package.json`: Project dependencies.

## Setup

1. Clone the repository.
2. Install the dependencies:
   ```sh
   npm install
   ```

## Running the Server

To start the server, run:

```sh
node app.js
```

The server will be running at http://127.0.0.1:8000/.

## Endpoints

* /: Returns a JSON message.
* /img: Returns a random cat image.

* /meow: Returns data from the cats table in the SQLite database.

## Database

The SQLite database should have a table named cats with a name column. You can use the insertData.js script to create the table and insert initial data.

To run the [insertData.js](vscode-file://vscode-app/c:/Users/chinc/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) script:


```sh
node insertData.js
```
