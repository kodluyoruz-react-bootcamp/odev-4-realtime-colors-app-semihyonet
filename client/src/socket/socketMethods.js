import io from "socket.io-client";

let socket;

export const initSocket = () => {
	socket = io("http://localhost:4000/", {
		transports: ["websocket"],
	});

	console.log("Connecting...");
	socket.on("connect", () => console.log("Connected!"));
};

export const disconnectSocket = () => {
	console.log("Disconnecting...");
	if (socket) socket.disconnect();
};

export const sendMessage = (message) => {
	if (socket) socket.emit("new-message", message);
};

export const subscribeToPeopleNum = (cb) => {
	if (!socket) {
		return true;
	}

	socket.on("userNum", (message) => {
		console.log("peopleNum ", message);
		cb(message);
	});
};

export const subscribeInitialState = (cb) => {
	if (!socket) return true;

	socket.on("lightState", (data) => {
		cb(data);
	});
};

export const subscribeNewState = (cb) => {
	if (!socket) return true;
	socket.on("newState", (data) => {
		cb(data);
	});
};

export const toggledLight = (state) => {
	if (!socket) return true;

	socket.emit("toggleLight", state);
};
