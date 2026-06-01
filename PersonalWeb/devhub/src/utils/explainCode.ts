type Lang = string;

function inner(s: string, open: string, close: string): string {
  const i = s.indexOf(open);
  const j = s.lastIndexOf(close);
  if (i === -1) return s;
  return s.slice(i + open.length, j === -1 ? undefined : j).trim();
}

function isSkippable(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  if (/^[}\])\s;,]+$/.test(t)) return true;
  if (/^(then|done|fi|esac)$/.test(t)) return true;
  return false;
}

// ─── PYTHON ──────────────────────────────────────────────────────────────────
function explainPython(t: string): string | null {
  if (t.startsWith("#")) {
    const text = t.slice(1).trim();
    return text ? `*Note: ${text}*` : null;
  }

  if (t.startsWith("@")) {
    const name = t.slice(1).split("(")[0].trim();
    return `Applies the \`${name}\` decorator to the next function.`;
  }

  const asyncDef = t.match(/^async\s+def\s+(\w+)\s*\(([^)]*)\)/);
  if (asyncDef) {
    const params = asyncDef[2].trim();
    return `Defines an async function called \`${asyncDef[1]}\`${params ? ` that takes \`${params}\`` : ""}.`;
  }

  const defM = t.match(/^def\s+(\w+)\s*\(([^)]*)\)/);
  if (defM) {
    const params = defM[2].trim();
    return `Defines a function called \`${defM[1]}\`${params ? ` that takes \`${params}\`` : " with no parameters"}.`;
  }

  const classM = t.match(/^class\s+(\w+)(?:\(([^)]*)\))?/);
  if (classM) {
    return classM[2]
      ? `Creates a class called \`${classM[1]}\` that inherits from \`${classM[2]}\`.`
      : `Creates a class called \`${classM[1]}\`.`;
  }

  const fromImport = t.match(/^from\s+(\S+)\s+import\s+(.+)$/);
  if (fromImport) return `Imports \`${fromImport[2].trim()}\` from the \`${fromImport[1]}\` module.`;

  const imp = t.match(/^import\s+(.+)$/);
  if (imp) {
    const mods = imp[1].split(",").map(s => s.trim().split(/\s+as\s+/)[0]).join("`, `");
    return `Imports the \`${mods}\` module.`;
  }

  if (/^return\b/.test(t)) {
    const val = t.slice(6).trim();
    return val ? `Returns \`${val}\` to the caller.` : "Returns from the function with no value.";
  }

  if (/^yield\b/.test(t)) {
    const val = t.slice(5).trim();
    return val ? `Yields \`${val}\` and pauses until the next value is requested.` : "Yields nothing and pauses the generator.";
  }

  if (/^print\s*\(/.test(t)) {
    const arg = inner(t, "(", ")");
    return `Prints \`${arg}\` to the terminal.`;
  }

  if (/^raise\b/.test(t)) {
    const val = t.slice(5).trim();
    return val ? `Raises a \`${val}\` error, stopping execution.` : "Re-raises the current exception.";
  }

  const ifM = t.match(/^if\s+(.+):$/);
  if (ifM) return `Checks whether \`${ifM[1].trim()}\` is true.`;

  const elifM = t.match(/^elif\s+(.+):$/);
  if (elifM) return `Otherwise checks whether \`${elifM[1].trim()}\` is true.`;

  if (t === "else:") return "Runs this block when none of the previous conditions matched.";

  const forM = t.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);
  if (forM) return `Loops through \`${forM[2].trim()}\`, calling each item \`${forM[1].trim()}\`.`;

  const whileM = t.match(/^while\s+(.+):$/);
  if (whileM) {
    return whileM[1].trim() === "True"
      ? "Runs the block below indefinitely until a `break` is hit."
      : `Keeps running the block while \`${whileM[1].trim()}\` is true.`;
  }

  if (t === "try:") return "Starts a block that will be watched for errors.";

  const exceptM = t.match(/^except\s+([^:]+?)(?:\s+as\s+(\w+))?:/);
  if (exceptM) {
    return exceptM[2]
      ? `Catches \`${exceptM[1].trim()}\` errors and names the error \`${exceptM[2]}\`.`
      : `Catches \`${exceptM[1].trim()}\` errors from the try block above.`;
  }
  if (t === "except:") return "Catches any error raised in the try block above.";
  if (t === "finally:") return "Always runs this block, whether an error occurred or not.";

  if (t === "break") return "Exits the current loop immediately.";
  if (t === "continue") return "Skips the rest of this iteration and moves to the next one.";
  if (t === "pass") return "Does nothing — placeholder where code is required syntactically.";

  const withM = t.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:/);
  if (withM) return `Opens \`${withM[1].trim()}\` as \`${withM[2]}\` and automatically closes it when done.`;
  if (/^with\s+.+:$/.test(t)) {
    const res = t.slice(4, -1).trim();
    return `Uses \`${res}\` as a context manager, closing it automatically when the block ends.`;
  }

  if (/\blambda\b/.test(t) && t.includes(":")) return "Creates a small inline anonymous function.";

  const listComp = t.match(/\[(.+?)\s+for\s+(\w+)\s+in\s+(.+?)\]/);
  if (listComp) return `Builds a list by applying \`${listComp[1].trim()}\` to each \`${listComp[2]}\` in \`${listComp[3].trim()}\`.`;

  const dictComp = t.match(/\{(.+?):\s*(.+?)\s+for\s+\w+\s+in\s+.+\}/);
  if (dictComp) return "Builds a dictionary using a comprehension — generates key-value pairs in a single expression.";

  if (t.includes(".append(")) {
    const m = t.match(/^(\w+)\.append\((.+)\)/);
    if (m) return `Adds \`${m[2].trim()}\` to the end of the \`${m[1]}\` list.`;
    return "Adds an item to the end of a list.";
  }
  if (t.includes(".remove(")) {
    const m = t.match(/(\w+)\.remove\((.+)\)/);
    if (m) return `Removes the first occurrence of \`${m[2].trim()}\` from \`${m[1]}\`.`;
  }
  if (t.includes(".pop(")) {
    const m = t.match(/(\w+)\.pop\(([^)]*)\)/);
    if (m) return m[2].trim() ? `Removes and returns the item at index \`${m[2].trim()}\` from \`${m[1]}\`.` : `Removes and returns the last item from \`${m[1]}\`.`;
  }
  if (t.includes(".split(")) {
    const m = t.match(/(\w+)\.split\(([^)]*)\)/);
    if (m) {
      const sep = m[2].trim();
      return sep ? `Splits \`${m[1]}\` into a list using \`${sep}\` as the separator.` : `Splits \`${m[1]}\` into a list of words by whitespace.`;
    }
  }
  if (t.includes(".join(")) {
    const m = t.match(/(.+?)\.join\((.+)\)/);
    if (m) return `Joins the items in \`${m[2].trim()}\` into one string, separated by \`${m[1].trim()}\`.`;
  }
  if (t.includes(".strip()")) {
    const m = t.match(/(\w+)\.strip/);
    if (m) return `Removes leading and trailing whitespace from \`${m[1]}\`.`;
  }
  if (t.includes(".lower()")) {
    const m = t.match(/(\w+)\.lower/);
    if (m) return `Converts \`${m[1]}\` to all lowercase letters.`;
  }
  if (t.includes(".upper()")) {
    const m = t.match(/(\w+)\.upper/);
    if (m) return `Converts \`${m[1]}\` to all uppercase letters.`;
  }
  if (t.includes(".keys()")) {
    const m = t.match(/(\w+)\.keys/);
    if (m) return `Returns all the keys of the \`${m[1]}\` dictionary.`;
  }
  if (t.includes(".values()")) {
    const m = t.match(/(\w+)\.values/);
    if (m) return `Returns all the values in the \`${m[1]}\` dictionary.`;
  }
  if (t.includes(".items()")) {
    const m = t.match(/(\w+)\.items/);
    if (m) return `Returns each key-value pair in \`${m[1]}\` as a tuple.`;
  }
  if (t.includes(".get(")) {
    const m = t.match(/(\w+)\.get\((.+)\)/);
    if (m) return `Looks up \`${inner(m[2], "", "")}\` in \`${m[1]}\`, returning a default if not found.`;
  }
  if (t.includes(".format(")) {
    return "Fills in the placeholders `{}` in the string with the given values.";
  }
  if (t.includes(".read()")) {
    const m = t.match(/(\w+)\.read\(\)/);
    if (m) return `Reads the entire contents of \`${m[1]}\` and returns them as a string.`;
  }
  if (t.includes(".write(")) {
    const m = t.match(/(\w+)\.write\((.+)\)/);
    if (m) return `Writes \`${m[2].trim()}\` to the file \`${m[1]}\`.`;
  }
  if (t.includes(".close()")) {
    const m = t.match(/(\w+)\.close/);
    if (m) return `Closes the file \`${m[1]}\` so no more reads or writes can happen.`;
  }

  const augAdd = t.match(/^([\w\[\].]+)\s*\+=\s*(.+)$/);
  if (augAdd) return `Adds \`${augAdd[2].trim()}\` to \`${augAdd[1].trim()}\` and saves the result back.`;
  const augSub = t.match(/^([\w\[\].]+)\s*-=\s*(.+)$/);
  if (augSub) return `Subtracts \`${augSub[2].trim()}\` from \`${augSub[1].trim()}\` and saves the result back.`;
  const augMul = t.match(/^([\w\[\].]+)\s*\*=\s*(.+)$/);
  if (augMul) return `Multiplies \`${augMul[1].trim()}\` by \`${augMul[2].trim()}\` and saves the result back.`;

  const assign = t.match(/^([\w\[\]., ]+?)\s*=\s*([^=].*)$/);
  if (assign && !assign[0].includes("==")) {
    const varName = assign[1].trim();
    const val = assign[2].trim();
    if (/\bopen\s*\(/.test(val)) return `Opens the file \`${inner(val, "(", ")")}\` and stores the handle in \`${varName}\`.`;
    if (/\w+\s*\(/.test(val)) return `Stores the result of \`${val.length > 50 ? val.slice(0, 47) + "…" : val}\` in \`${varName}\`.`;
    return `Sets \`${varName}\` to \`${val.length > 60 ? val.slice(0, 57) + "…" : val}\`.`;
  }

  if (/^\w[\w.]*\s*\(/.test(t)) {
    const m = t.match(/^([\w.]+)\s*\(/);
    if (m) return `Calls \`${m[1]}\` with the given arguments.`;
  }

  return `Runs: \`${t.length > 70 ? t.slice(0, 67) + "…" : t}\`.`;
}

// ─── JAVASCRIPT / TYPESCRIPT ────────────────────────────────────────────────
function explainJS(t: string): string | null {
  if (t.startsWith("//")) {
    const text = t.slice(2).trim();
    return text ? `*Note: ${text}*` : null;
  }
  if (t.startsWith("/*") || /^\*/.test(t)) {
    const text = t.replace(/^\/?\*+\/?/, "").trim();
    return text && text !== "/" ? `*Note: ${text}*` : null;
  }

  const impM = t.match(/^import\s+(.+?)\s+from\s+['"](.+)['"]/);
  if (impM) return `Imports \`${impM[1]}\` from the \`${impM[2]}\` module.`;
  const impSide = t.match(/^import\s+['"](.+)['"]/);
  if (impSide) return `Imports \`${impSide[1]}\` as a side effect (no bindings).`;

  if (/^export\s+default\b/.test(t)) return "Exports this as the default export of the module.";
  if (/^export\b/.test(t)) return "Makes this value available to other modules.";

  const asyncFn = t.match(/^async\s+function\s+(\w+)\s*\(([^)]*)\)/);
  if (asyncFn) return `Defines an async function called \`${asyncFn[1]}\`${asyncFn[2].trim() ? ` that takes \`${asyncFn[2].trim()}\`` : ""}.`;

  const fn = t.match(/^function\s+(\w+)\s*\(([^)]*)\)/);
  if (fn) return `Defines a function called \`${fn[1]}\`${fn[2].trim() ? ` that takes \`${fn[2].trim()}\`` : ""}.`;

  const arrowConst = t.match(/^(?:const|let|var)\s+(\w+)\s*=\s*(async\s*)?\(([^)]*)\)\s*=>/);
  if (arrowConst) return `Defines ${arrowConst[2] ? "an async " : "a "}function called \`${arrowConst[1]}\`${arrowConst[3].trim() ? ` that takes \`${arrowConst[3].trim()}\`` : ""}.`;

  const destructConst = t.match(/^(?:const|let|var)\s+\{([^}]+)\}\s*=\s*(.+?);?$/);
  if (destructConst) return `Destructures \`${destructConst[1].trim()}\` out of \`${destructConst[2].trim()}\`.`;
  const destructArr = t.match(/^(?:const|let|var)\s+\[([^\]]+)\]\s*=\s*(.+?);?$/);
  if (destructArr) return `Destructures \`${destructArr[1].trim()}\` from the array \`${destructArr[2].trim()}\`.`;

  const constM = t.match(/^(const|let|var)\s+(\w+)\s*=\s*(.+?);?$/);
  if (constM) {
    const kw = constM[1] === "const" ? "constant" : "variable";
    const val = constM[3].trim();
    if (/\bnew\s+(\w+)/.test(val)) return `Creates a ${kw} \`${constM[2]}\` holding a new \`${val.match(/new\s+(\w+)/)?.[1]}\` instance.`;
    if (/\w+\s*\(/.test(val)) return `Creates a ${kw} \`${constM[2]}\` with the result of \`${val.length > 50 ? val.slice(0, 47) + "…" : val}\`.`;
    return `Creates a ${kw} \`${constM[2]}\` set to \`${val.length > 60 ? val.slice(0, 57) + "…" : val}\`.`;
  }

  const classM = t.match(/^class\s+(\w+)(?:\s+extends\s+(\w+))?/);
  if (classM) return classM[2] ? `Creates a class called \`${classM[1]}\` that extends \`${classM[2]}\`.` : `Creates a class called \`${classM[1]}\`.`;

  const ifM = t.match(/^if\s*\((.+)\)\s*\{?$/);
  if (ifM) return `Checks whether \`${ifM[1].trim()}\` is true.`;
  const elseIfM = t.match(/^else\s+if\s*\((.+)\)\s*\{?$/);
  if (elseIfM) return `Otherwise checks whether \`${elseIfM[1].trim()}\` is true.`;
  if (t === "else" || t === "else {") return "Runs this block when none of the conditions above matched.";

  const forOf = t.match(/^for\s*\((?:const|let|var)?\s*(.+?)\s+of\s+(.+?)\)/);
  if (forOf) return `Loops through each item in \`${forOf[2].trim()}\`, calling it \`${forOf[1].trim()}\`.`;
  const forIn = t.match(/^for\s*\((?:const|let|var)?\s*(.+?)\s+in\s+(.+?)\)/);
  if (forIn) return `Loops over the keys of \`${forIn[2].trim()}\`, calling each key \`${forIn[1].trim()}\`.`;
  if (/^for\s*\(/.test(t)) return "Repeats the block below for a set number of iterations.";

  const whileM = t.match(/^while\s*\((.+)\)/);
  if (whileM) return `Keeps running the block while \`${whileM[1].trim()}\` is true.`;

  if (/^return\b/.test(t)) {
    const val = t.slice(6).trim().replace(/;$/, "");
    return val ? `Returns \`${val.length > 60 ? val.slice(0, 57) + "…" : val}\` to the caller.` : "Returns from the function with no value.";
  }

  if (/\bawait\b/.test(t)) {
    const m = t.match(/await\s+([\w.()[\]'"` +]+?)(?:\s*[;,)]|$)/);
    if (m) return `Waits for \`${m[1].trim()}\` to resolve before moving on.`;
  }

  const consoleM = t.match(/console\.(log|warn|error|info)\s*\((.+)\)/);
  if (consoleM) {
    const type = consoleM[1] === "warn" ? "warning" : consoleM[1] === "error" ? "error" : "message";
    return `Prints the ${type} \`${consoleM[2].trim()}\` to the browser console.`;
  }

  if (t === "try {" || t === "try{") return "Starts a block that will be watched for errors.";
  const catchM = t.match(/^catch\s*\((\w+)\)/);
  if (catchM) return `Catches any error thrown in the try block and names it \`${catchM[1]}\`.`;
  if (t === "finally {" || t === "finally{") return "Always runs this block, error or not.";

  const throwM = t.match(/^throw\s+(.+?);?$/);
  if (throwM) return `Throws a \`${throwM[1].trim()}\` error.`;

  if (t === "break;" || t === "break") return "Exits the current loop immediately.";
  if (t === "continue;" || t === "continue") return "Skips to the next loop iteration.";

  if (t.includes(".map(")) { const m = t.match(/(\w+)\.map\(/); return m ? `Transforms each item in \`${m[1]}\` into a new array.` : "Transforms each item and returns a new array."; }
  if (t.includes(".filter(")) { const m = t.match(/(\w+)\.filter\(/); return m ? `Filters \`${m[1]}\` to only items where the condition is true.` : "Filters the array by a condition."; }
  if (t.includes(".forEach(")) { const m = t.match(/(\w+)\.forEach\(/); return m ? `Runs the callback once for each item in \`${m[1]}\`.` : "Runs a callback for every array item."; }
  if (t.includes(".reduce(")) { const m = t.match(/(\w+)\.reduce\(/); return m ? `Combines all items in \`${m[1]}\` into a single value.` : "Combines all array items into one value."; }
  if (t.includes(".find(")) { const m = t.match(/(\w+)\.find\(/); return m ? `Finds the first item in \`${m[1]}\` that matches the condition.` : "Finds the first matching item in the array."; }
  if (t.includes(".push(")) { const m = t.match(/(\w+)\.push\((.+)\)/); if (m) return `Adds \`${m[2].trim()}\` to the end of \`${m[1]}\`.`; }
  if (t.includes(".pop()")) { const m = t.match(/(\w+)\.pop/); if (m) return `Removes and returns the last item from \`${m[1]}\`.`; }
  if (t.includes(".includes(")) { const m = t.match(/(\w+)\.includes\((.+)\)/); if (m) return `Checks whether \`${m[1]}\` contains \`${m[2].trim()}\`.`; }
  if (t.includes(".split(")) { const m = t.match(/(\w+)\.split\((.+)\)/); if (m) return `Splits \`${m[1]}\` into an array using \`${m[2].trim()}\` as the separator.`; }
  if (t.includes(".join(")) { const m = t.match(/(\w+)\.join\((.+)\)/); if (m) return `Joins the items of \`${m[1]}\` into a string, separated by \`${m[2].trim()}\`.`; }
  if (t.includes(".trim()")) { const m = t.match(/(\w+)\.trim/); if (m) return `Removes leading and trailing whitespace from \`${m[1]}\`.`; }
  if (t.includes(".toLowerCase()")) { const m = t.match(/(\w+)\.toLower/); if (m) return `Converts \`${m[1]}\` to all lowercase.`; }
  if (t.includes(".toUpperCase()")) { const m = t.match(/(\w+)\.toUpper/); if (m) return `Converts \`${m[1]}\` to all uppercase.`; }

  const augAdd = t.match(/^([\w.[\]]+)\s*\+=\s*(.+?);?$/);
  if (augAdd) return `Adds \`${augAdd[2].trim()}\` to \`${augAdd[1].trim()}\` and saves the result.`;

  const assign = t.match(/^([\w.[\]]+)\s*=\s*([^=].*?);?$/);
  if (assign && !assign[0].includes("==")) {
    const lhs = assign[1].trim();
    const rhs = assign[2].trim();
    if (/\w+\s*\(/.test(rhs)) return `Stores the result of \`${rhs.length > 50 ? rhs.slice(0, 47) + "…" : rhs}\` in \`${lhs}\`.`;
    return `Sets \`${lhs}\` to \`${rhs.length > 60 ? rhs.slice(0, 57) + "…" : rhs}\`.`;
  }

  if (/^[\w.]+\s*\(/.test(t)) { const m = t.match(/^([\w.]+)\s*\(/); if (m) return `Calls \`${m[1]}\` with the given arguments.`; }

  return `Runs: \`${t.length > 70 ? t.slice(0, 67) + "…" : t}\`.`;
}

// ─── SQL ─────────────────────────────────────────────────────────────────────
function explainSQL(t: string): string | null {
  if (t.startsWith("--")) { const text = t.slice(2).trim(); return text ? `*Note: ${text}*` : null; }

  if (/^SELECT\b/i.test(t)) {
    const cols = t.replace(/^SELECT\s+/i, "").split(/\s+FROM\b/i)[0].trim();
    return `Selects \`${cols.length > 60 ? cols.slice(0, 57) + "…" : cols}\` from the table.`;
  }
  if (/^FROM\b/i.test(t)) { const tbl = t.replace(/^FROM\s+/i, "").split(/\s/)[0].trim(); return `Fetches data from the \`${tbl}\` table.`; }
  if (/^WHERE\b/i.test(t)) { const cond = t.replace(/^WHERE\s+/i, "").trim(); return `Filters rows where \`${cond}\`.`; }

  const joinM = t.match(/^((?:LEFT|RIGHT|INNER|OUTER|FULL|CROSS)?\s*JOIN)\s+(\w+)\s+ON\s+(.+)/i);
  if (joinM) return `Joins the \`${joinM[2]}\` table where \`${joinM[3].trim()}\`.`;

  if (/^GROUP BY\b/i.test(t)) { const col = t.replace(/^GROUP BY\s+/i, "").trim(); return `Groups the results by \`${col}\`.`; }
  if (/^ORDER BY\b/i.test(t)) {
    const raw = t.replace(/^ORDER BY\s+/i, "").trim();
    const dir = /\bDESC\b/i.test(raw) ? "descending" : "ascending";
    return `Sorts results by \`${raw.replace(/\s+(ASC|DESC)\s*;?$/i, "").trim()}\` in ${dir} order.`;
  }
  if (/^HAVING\b/i.test(t)) { const cond = t.replace(/^HAVING\s+/i, "").trim(); return `Filters grouped rows where \`${cond}\`.`; }
  if (/^LIMIT\b/i.test(t)) { const n = t.replace(/^LIMIT\s+/i, "").trim(); return `Returns at most \`${n}\` rows.`; }
  if (/^OFFSET\b/i.test(t)) { const n = t.replace(/^OFFSET\s+/i, "").trim(); return `Skips the first \`${n}\` rows.`; }
  if (/^INSERT INTO\b/i.test(t)) { const m = t.match(/^INSERT INTO\s+(\w+)/i); return m ? `Inserts a new row into the \`${m[1]}\` table.` : "Inserts a new row."; }
  if (/^VALUES\b/i.test(t)) { const vals = t.replace(/^VALUES\s*/i, "").trim(); return `Provides the values \`${vals.length > 60 ? vals.slice(0, 57) + "…" : vals}\` for the new row.`; }
  if (/^UPDATE\b/i.test(t)) { const m = t.match(/^UPDATE\s+(\w+)/i); return m ? `Updates rows in the \`${m[1]}\` table.` : "Updates rows in a table."; }
  if (/^SET\b/i.test(t)) { const cols = t.replace(/^SET\s+/i, "").trim(); return `Sets the column values: \`${cols.length > 60 ? cols.slice(0, 57) + "…" : cols}\`.`; }
  if (/^DELETE FROM\b/i.test(t)) { const m = t.match(/^DELETE FROM\s+(\w+)/i); return m ? `Deletes matching rows from the \`${m[1]}\` table.` : "Deletes matching rows."; }
  if (/^CREATE TABLE\b/i.test(t)) { const m = t.match(/^CREATE TABLE\s+(?:IF NOT EXISTS\s+)?(\w+)/i); return m ? `Creates a new table called \`${m[1]}\`.` : "Creates a new table."; }
  if (/^DROP TABLE\b/i.test(t)) { const m = t.match(/^DROP TABLE\s+(\w+)/i); return m ? `Permanently deletes the \`${m[1]}\` table.` : "Permanently deletes a table."; }
  if (/^ALTER TABLE\b/i.test(t)) { const m = t.match(/^ALTER TABLE\s+(\w+)/i); return m ? `Modifies the structure of the \`${m[1]}\` table.` : "Modifies a table's structure."; }
  if (/^CREATE INDEX\b/i.test(t)) return "Creates an index to speed up lookups on this column.";
  if (/^PRIMARY KEY\b/i.test(t)) return "Marks this column as the unique identifier for each row.";
  if (/^FOREIGN KEY\b/i.test(t)) return "Links this column to the primary key of another table.";
  if (/^NOT NULL\b/i.test(t)) return "Requires this column to always have a value.";

  return `Runs the SQL clause: \`${t.length > 70 ? t.slice(0, 67) + "…" : t}\`.`;
}

// ─── HTML ─────────────────────────────────────────────────────────────────────
const HTML_TAGS: Record<string, string> = {
  html: "Marks the start of the HTML document.", head: "Contains page metadata — not shown to users.",
  body: "Wraps all the visible content on the page.", div: "Creates a generic container block to group content.",
  span: "Creates an inline container for styling a piece of text.", p: "Creates a paragraph of text.",
  h1: "Creates the top-level heading — the main title.", h2: "Creates a second-level subheading.",
  h3: "Creates a third-level subheading.", h4: "Creates a fourth-level heading.",
  h5: "Creates a fifth-level heading.", h6: "Creates a sixth-level heading.",
  a: "Creates a clickable hyperlink.", img: "Embeds an image.",
  ul: "Creates an unordered (bulleted) list.", ol: "Creates an ordered (numbered) list.",
  li: "Creates a single list item.", table: "Creates a table to display data in rows and columns.",
  tr: "Creates a table row.", td: "Creates a table data cell.", th: "Creates a table header cell.",
  thead: "Groups the header rows of the table.", tbody: "Groups the data rows of the table.",
  form: "Creates a form to collect user input.", input: "Creates an input field for user data.",
  button: "Creates a clickable button.", label: "Labels an input for accessibility.",
  select: "Creates a dropdown menu.", option: "Defines one choice in a dropdown.",
  textarea: "Creates a multi-line text input field.", nav: "Marks a block of navigation links.",
  header: "Marks the top section of the page or a section.", footer: "Marks the bottom section.",
  main: "Marks the main content area of the page.", section: "Groups related content thematically.",
  article: "Marks standalone content like a blog post.", aside: "Holds supplementary content.",
  script: "Embeds or links JavaScript code.", style: "Embeds CSS styles directly in the page.",
  link: "Links an external resource, usually a stylesheet.", meta: "Provides page metadata to browsers.",
  title: "Sets the text shown in the browser tab.", br: "Inserts a line break.",
  hr: "Inserts a horizontal dividing line.", strong: "Makes text bold — strong importance.",
  em: "Makes text italic — adds emphasis.", code: "Displays text in a monospace code font.",
  pre: "Preserves whitespace and displays content exactly as written.",
  blockquote: "Indents and marks a block of quoted text.", iframe: "Embeds another web page inside this one.",
  canvas: "Creates a drawable area for graphics via JavaScript.",
  video: "Embeds a video player.", audio: "Embeds an audio player.",
  svg: "Creates scalable vector graphics.", figure: "Groups media content with an optional caption.",
  figcaption: "Provides a caption for a figure element.",
};

function explainHTML(t: string): string | null {
  if (t.startsWith("<!--")) {
    const text = t.replace(/<!--\s*/, "").replace(/\s*-->$/, "").trim();
    return text ? `*Note: ${text}*` : null;
  }
  if (/^<\//.test(t)) return null;
  if (/<!DOCTYPE/i.test(t)) return "Declares this as an HTML5 document.";

  const tag = t.match(/^<(\w[\w-]*)/)?.[1]?.toLowerCase() ?? "";
  let base = HTML_TAGS[tag] ?? `Defines a \`<${tag}>\` element.`;

  const href = t.match(/\bhref=["']([^"']+)/)?.[1];
  const src  = t.match(/\bsrc=["']([^"']+)/)?.[1];
  const type = t.match(/\btype=["']([^"']+)/)?.[1];
  const name = t.match(/\bname=["']([^"']+)/)?.[1];
  const id   = t.match(/\bid=["']([^"']+)/)?.[1];
  const cls  = t.match(/\bclass=["']([^"']+)/)?.[1];

  if (tag === "a" && href) base = `Creates a link to \`${href}\`.`;
  if (tag === "img" && src) base = `Embeds the image at \`${src}\`.`;
  if (tag === "link" && href) base = `Links the stylesheet at \`${href}\`.`;
  if (tag === "script" && src) base = `Loads the script at \`${src}\`.`;
  if (tag === "input" && type) base = `Creates a \`${type}\` input field${name ? ` named \`${name}\`` : ""}.`;
  if (tag === "meta") {
    const nameAttr = t.match(/\bname=["']([^"']+)/)?.[1];
    const content  = t.match(/\bcontent=["']([^"']+)/)?.[1];
    if (nameAttr && content) base = `Sets the \`${nameAttr}\` metadata to \`${content}\`.`;
  }

  const suffix = id ? ` — given the id \`${id}\`` : cls ? ` — styled with class \`${cls}\`` : "";
  return base + suffix;
}

// ─── BASH ─────────────────────────────────────────────────────────────────────
function explainBash(t: string): string | null {
  if (t.startsWith("#!")) return `Tells the OS to run this script with \`${t.slice(2).trim()}\`.`;
  if (t.startsWith("#")) { const text = t.slice(1).trim(); return text ? `*Note: ${text}*` : null; }

  if (/^echo\b/.test(t)) { const val = t.slice(4).trim(); return `Prints \`${val}\` to the terminal.`; }

  const exportAssign = t.match(/^export\s+(\w+)=(.+)$/);
  if (exportAssign) return `Sets the environment variable \`${exportAssign[1]}\` to \`${exportAssign[2].trim()}\` and exports it for child processes.`;
  const exportName = t.match(/^export\s+(\w+)$/);
  if (exportName) return `Exports \`${exportName[1]}\` as an environment variable for child processes.`;

  const varAssign = t.match(/^(\w+)=(.*)$/);
  if (varAssign && !varAssign[0].startsWith("if")) return `Sets the shell variable \`${varAssign[1]}\` to \`${varAssign[2].trim() || "(empty string)"}\`.`;

  const ifM = t.match(/^if\s+(.+?)(?:;\s*then)?$/);
  if (ifM) return `Checks whether \`${ifM[1].trim()}\` is true.`;
  if (t === "else") return "Runs this block if the condition above was false.";

  const forM = t.match(/^for\s+(\w+)\s+in\s+(.+?)(?:;\s*do)?$/);
  if (forM) return `Loops through \`${forM[2].trim()}\`, calling each item \`${forM[1]}\`.`;

  const whileM = t.match(/^while\s+(.+?)(?:;\s*do)?$/);
  if (whileM) return `Keeps running the block while \`${whileM[1].trim()}\` is true.`;

  const cdM = t.match(/^cd\s+(.+)$/); if (cdM) return `Changes the current directory to \`${cdM[1].trim()}\`.`;
  if (t === "cd") return "Changes to the home directory.";

  const lsM = t.match(/^ls\s*(.*)$/); if (lsM) return `Lists files in the directory${lsM[1] ? ` with options \`${lsM[1].trim()}\`` : ""}.`;
  const mkdirM = t.match(/^mkdir\s+(.+)$/); if (mkdirM) return `Creates a directory called \`${mkdirM[1].trim()}\`.`;
  if (/^rm\b/.test(t)) return "Deletes the specified file or directory.";
  if (/^cp\b/.test(t)) return "Copies a file or directory to a new location.";
  if (/^mv\b/.test(t)) return "Moves or renames a file or directory.";
  const catM = t.match(/^cat\s+(.+)$/); if (catM) return `Prints the contents of \`${catM[1].trim()}\` to the terminal.`;
  if (/^grep\b/.test(t)) return "Searches for a text pattern in files or standard input.";
  if (/^curl\b/.test(t)) return "Makes an HTTP request to the given URL.";
  if (/^chmod\b/.test(t)) return "Changes the permissions of a file or directory.";

  const pipM = t.match(/^pip3?\s+install\s+(.+)$/); if (pipM) return `Installs the Python package \`${pipM[1].trim()}\`.`;
  const pyM  = t.match(/^python3?\s+(.+)$/); if (pyM)  return `Runs the Python script \`${pyM[1].trim()}\`.`;
  const npmM = t.match(/^npm\s+(.+)$/); if (npmM) return `Runs \`npm ${npmM[1].trim()}\`.`;
  const gitM = t.match(/^git\s+(\w+)/); if (gitM) return `Runs \`git ${gitM[1]}\` to manage the repository.`;

  if (t.includes(" | ")) {
    const parts = t.split(" | ");
    return `Runs \`${parts[0].split(" ")[0]}\` and pipes its output into \`${parts[parts.length - 1].split(" ")[0]}\`.`;
  }
  if (t.includes(" >> ")) { const p = t.split(" >> "); return `Runs \`${p[0].trim()}\` and appends the output to \`${p[1].trim()}\`.`; }
  if (t.includes(" > "))  { const p = t.split(" > ");  return `Runs \`${p[0].trim()}\` and writes the output to \`${p[1].trim()}\`.`; }

  const cmd = t.split(/\s+/)[0];
  return `Runs the \`${cmd}\` command.`;
}

// ─── GENERIC FALLBACK ────────────────────────────────────────────────────────
function explainGeneric(t: string): string {
  return `Executes: \`${t.length > 70 ? t.slice(0, 67) + "…" : t}\`.`;
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────
/**
 * Returns a plain-English explanation for a single line of code,
 * or `null` when the line should be skipped (blank, closing bracket, etc.).
 */
export function explainLine(rawLine: string, lang: Lang): string | null {
  if (isSkippable(rawLine)) return null;
  const t = rawLine.trim();

  const l = lang.toLowerCase();
  if (l === "py" || l === "python") return explainPython(t);
  if (l === "js" || l === "javascript" || l === "ts" || l === "typescript" || l === "jsx" || l === "tsx") return explainJS(t);
  if (l === "sql") return explainSQL(t);
  if (l === "html") return explainHTML(t);
  if (l === "bash" || l === "sh" || l === "shell") return explainBash(t);
  return explainGeneric(t);
}
