const util = require("util");
const uuidv1 = require("uuid/v1");
const fs = require("fs");
const path = require("path");
const readFromFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Helper {
  read() {
    return readFromFile("db/db.json", "utf8");
  }
  write(note) {
    return writeFile("db/db.json", JSON.stringify(note));
  }
  getNote() {
    return this.read().then((notes) => {
      let parsednotes;
      try {
        parsednotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsednotes = [];
      }
      return parsednotes;
    });
  }
  createNote(note) {
    const { title, text } = note;
    if (title && text === null) {
      throw new Error("Notes need a title and text");
    }
    const newNote = { title, text, id: uuidv1() };
    return this.getNote()
      .then((notes) => [...notes, newNote])
      .then((updateDB) => this.write(updateDB))
      .then(() => newNote);
  }
  deleteNote(id) {
    return this.getNote()
    .then((notes) => {
      const deletedNote = id;
      for (let i = 0; i < notes.length; i++) {
        if (deletedNote === notes[i].id) {
          notes.splice(i, 1)
          return writeFile("db/db.json", JSON.stringify(notes));
        }
      }})
  } 
}

module.exports = new Helper();