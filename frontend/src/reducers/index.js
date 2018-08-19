import { combineReducers } from 'redux';
import tasks from "./tasks";
import lifts from "./lifts";
import auth from "./auth";
import books from "./books";
import book_notes from "./book_notes";
import markets from "./markets";
import skills from "./skills";
import authors from "./authors";

const azadApp = combineReducers({
    tasks,
    lifts,
    auth,
    books,
    book_notes,
    markets,
    skills,
    authors,
})

export default azadApp;