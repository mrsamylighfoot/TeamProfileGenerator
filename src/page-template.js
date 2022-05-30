const makeHTML = (team) => {
  return `
    <div>
       <h1> ${team.name}</h1>
        <h2>${team.id}</h2>
        <h3>${team.email}</h3>
    </div>
    `;
};

module.exports = (team) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${makeHTML(team)}
    </body>
    </html>`;
};
