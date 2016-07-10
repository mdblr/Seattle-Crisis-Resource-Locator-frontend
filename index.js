const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
  let window = new BrowserWindow({
    width: 1440,
    height: 900
  });
  window.loadURL(`file://${__dirname}/index.html`);
});
