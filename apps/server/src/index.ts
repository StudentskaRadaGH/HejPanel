import { printConnect, printDisconnect, printHydratedData, printRestartingSync, printSentDataToUID, printServerReady, printStartupScreen, printSuspendingSync } from "./utils/print";

import { CanteenManager } from "./managers/canteenManager";
import { ConfigurationManager } from "./managers/configurationManager";
import { DeparturesManager } from "./managers/departuresManager";
import { PanelsManager } from "./managers/panelsManager";
import { Server } from "socket.io";
import express from "express";
import { privateEnv } from "env";

// #region Server setup
const REST_API = express();
REST_API.use(express.json());

const WS_SERVER = new Server({
	cors: {
		origin: [privateEnv.ADMIN_URL, privateEnv.CLIENT_URL],
	},
});

let numberOfConnections = 0;

WS_SERVER.on("connection", async (socket) => {
	printConnect(socket.id);

	if (!tickInterval) {
		printRestartingSync();

		await Promise.all([panels.init(), canteen.init(), departures.init()]);

		tickInterval = setInterval(tickManagers, tickRate);
	}

	numberOfConnections++;

	socket.emit("sync", {
		...configuration.current,
		canteen: canteen.current,
		departures: departures.current,
		panels: panels.current,
	});
	printSentDataToUID(socket.id, "configuration", "canteen", "departures", "visible panels");

	socket.on("disconnect", () => {
		printDisconnect(socket.id);

		numberOfConnections--;

		if (numberOfConnections === 0 && tickInterval) {
			clearInterval(tickInterval);
			tickInterval = null;
			printSuspendingSync();
		}
	});
});
// #endregion

// #region Event loop setup
let tickInterval: NodeJS.Timeout | null = null;
const tickRate = 10_000; // 10 seconds
const tickManagers = () => Promise.all([panels.tick(), canteen.tick(), departures.tick()]);
// #endregion

// #region Managers definition
const configuration = new ConfigurationManager({
	onThemeChange: (theme) => {
		WS_SERVER.emit("theme", theme);
		printHydratedData("theme");
		return Promise.resolve();
	},
	onTimetableEnabledChange: (enabled) => {
		WS_SERVER.emit("timetable:enable", enabled);
		printHydratedData("timetableEnabled");
		return Promise.resolve();
	},
	onCanteenEnabledChange: async (enabled) => {
		WS_SERVER.emit("canteen:enable", enabled);
		printHydratedData("canteenEnabled");

		if (enabled) await canteen.enable();
		else await canteen.disable();
	},
	onDeparturesEnabledChange: async (enabled) => {
		WS_SERVER.emit("departures:enable", enabled);
		printHydratedData("departuresEnabled");

		if (enabled) await departures.enable();
		else await departures.disable();
	},
});

const canteen = new CanteenManager((canteen) => {
	WS_SERVER.emit("canteen:update", canteen);
	printHydratedData("canteen");
});

const departures = new DeparturesManager((departures) => {
	WS_SERVER.emit("departures:update", departures);
	printHydratedData("departures");
});

const panels = new PanelsManager({
	onAddPanel: (panel) => {
		WS_SERVER.emit("panel:add", panel);
		printHydratedData("visible panel (ID: " + panel.id + ")");
	},
	onRemovePanel: (panelId) => {
		WS_SERVER.emit("panel:remove", panelId);
		printHydratedData("hidden panel (ID: " + panelId + ")");
	},
});
// #endregion

// #region Internal API definition
REST_API.get("/", (req, res) => {
	res.status(200).send({
		name: "HejPanel API",
		version: "1.0.0",
		status: "All systems operational",
	});
});

REST_API.post("/configuration", async (req, res) => {
	await configuration.dataSourceChanged();

	res.status(200);
});

REST_API.post("/canteen", async (req, res) => {
	await canteen.dataSourceChanged();

	res.status(200);
});

REST_API.post("/panels", async (req, res) => {
	await panels.dataSourceChanged();

	res.status(200);
});
// #endregion

// #region Server startup...
printStartupScreen();

configuration
	.init()
	.then(() => {
		const { canteenEnabled, departuresEnabled } = configuration.current;

		canteen.enabled = canteenEnabled;
		departures.enabled = departuresEnabled;
	})
	.then(async () => await Promise.all([REST_API.listen(privateEnv.SERVER_PORT), WS_SERVER.listen(privateEnv.WS_PORT)]))
	.then(printServerReady);
//#endregion
