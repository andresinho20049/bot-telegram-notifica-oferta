import { Level } from "level";

const dbPath = "/database";
const levelDB = new Level(dbPath);

export default levelDB;