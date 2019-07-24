const { app, BrowserWindow, Menu } = require("electron");

const url = require("url");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron")
  });
}

let mainWindow;
let newTaskWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Task App - desktop",
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/index.html"),
      protocol: "file",
      slashes: true
    })
  );

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createNewTaskWindow() {
  newTaskWindow = new BrowserWindow({
    width: 400,
    height: 330,
    title: "Add Task"
  });

  newTaskWindow.setMenuBarVisibility(false);

  newTaskWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/new-task.html"),
      protocol: "file",
      slashes: true
    })
  );
}

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Task",
        accelerator: "Ctrl+N",
        click() {
          createNewTaskWindow();
        }
      }
    ]
  }
];
