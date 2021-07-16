const editor = document.getElementById('editor');
const output = document.getElementById('output');
const checkCode = document.getElementById('checkCode');
const message = document.getElementById('message');

let sourceCode = ``;

const executeCode = (stringCode) => {
  output.innerHTML = '';
  try {
    eval(sourceCode);
  } catch (e) {
    message.innerHTML = `
    <div class="error-message">
    <span class="error-item">
    Error name: <br>
    ${e.name}
    </span>  
    <span class="error-item">
    Error message: <br>
    ${e.message}
    </span>  
    </div>
    `;
    return false;
  }
  const arraySourceCode = stringCode.split('\n');

  let filtered = arraySourceCode.filter((arraySourceCode) =>
    arraySourceCode.includes('console.log')
  );

  let i = 1;
  filtered.forEach((filtered) => {
    const whiteSpaceRemoved = filtered.trim();
    let consoleLogValue = whiteSpaceRemoved.substr(12);
    if (consoleLogValue[consoleLogValue.length - 1] == ';') {
      consoleLogValue = consoleLogValue.substr(0, consoleLogValue.length - 2);
    } else {
      consoleLogValue = consoleLogValue.substr(0, consoleLogValue.length - 1);
    }

    // wrhite console value to document
    stringCode += `\n document.getElementById('output').innerHTML += '<span class="console-output">'`;
    stringCode += `\n\ndocument.getElementById('output').innerHTML += '<span class="output-index">Output ${i}</span>: <br />'`;
    stringCode += `\n\ndocument.getElementById('output').innerHTML += ${consoleLogValue} + '</span>'`;
    i++;
  });

  i = 1;

  eval(stringCode);
};

editor.addEventListener('change', (e) => {
  sourceCode = e.target.value;
});

editor.addEventListener('keyup', (e) => {
  if (e.keyCode == 17) {
    executeCode(sourceCode);
  }
});

// Indent
editor.addEventListener('keydown', function (e) {
  // if (e.key == 'Tab') {
  //   e.preventDefault();
  //   var start = this.selectionStart;
  //   var end = this.selectionEnd;
  //   // set textarea value to: text before caret + tab + text after caret
  //   this.value =
  //     this.value.substring(0, start) + '\t' + this.value.substring(end);
  //   // put caret at right position again
  //   this.selectionStart = this.selectionEnd = start + 1;
  // }
});

checkCode.addEventListener('click', () => {
  executeCode(sourceCode);
});
