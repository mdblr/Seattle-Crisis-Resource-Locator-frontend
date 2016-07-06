const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
  let window = new BrowserWindow({
    width: 800,
    height: 600
  });
  window.loadURL(`file://${__dirname}/index.html`);
});
