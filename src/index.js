const {ipcRenderer }= require('electron')

// main Script
// cannot send message to other windows directly https://github.com/electron/electron/issues/991
function sendCommandToWorker(content) {
	ipcRenderer.send("printPDF", content);
}

document.getElementById("btn").addEventListener("click", () => {
	// send whatever you like
	sendCommandToWorker("<h1> hello I going to print worker </h1>");
});

// worker script
