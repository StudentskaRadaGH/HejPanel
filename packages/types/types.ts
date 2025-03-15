import { Dispatch, SetStateAction } from "react";
import { activityTypes, panelTypes, themes, userTypes } from "./constants";

export type User = {
	id: number;
	microsoftId: string;
	name: string;
	email: string;
	type: (typeof userTypes)[number];
};

type BaseActivity = {
	id: number;
	panel: Panel["id"];
	author: User["id"];
	sentAt: Date;
	type: (typeof activityTypes)[number];
	data: object;
	hidden: boolean;
};

export type UserRequestAddPanel = BaseActivity & {
	type: "user:request:addPanel";
	data: {};
};

export type AdminAddPanel = BaseActivity & {
	type: "admin:addPanel";
	data: {};
};

export type AdminAccept = BaseActivity & {
	type: "admin:accept";
	data: {};
};

export type AdminReject = BaseActivity & {
	type: "admin:reject";
	data: {};
};

export type AdminChangeTime = BaseActivity & {
	type: "admin:changeTime";
	data: {
		oldShowFrom: Date;
		oldShowTill: Date;
		newShowFrom: Date;
		newShowTill: Date;
	};
};

export type AdminChangeVisibility = BaseActivity & {
	type: "admin:changeVisibility";
	data: {
		newVisibility: boolean;
	};
};

export type AdminChangeShowFor = BaseActivity & {
	type: "admin:changeShowFor";
	data: {
		oldShowFor: number;
		newShowFor: number;
	};
};

export type AdminChangeContent = BaseActivity & {
	type: "admin:changeContent";
	data: {
		oldContent: string;
		newContent: string;
	};
};

export type Activity = UserRequestAddPanel | AdminAddPanel | AdminAccept | AdminReject | AdminChangeTime | AdminChangeVisibility | AdminChangeShowFor | AdminChangeContent;

type BasePanel = {
	id: number;
	author: User["id"];
	showFrom: Date;
	showTill: Date;
	isApproved: boolean;
	isDeprecated: boolean;
	isHidden: boolean;
	type: (typeof panelTypes)[number];
	showFor: number;
};

export type ImagePanel = BasePanel & {
	type: "image";
	content: {
		url: string;
	};
};

export type VideoPanel = BasePanel & {
	type: "video";
	content: {
		url: string;
	};
};

export type TextPanel = BasePanel & {
	type: "text";
	content: {
		content: string;
		background: PanelBackground["id"];
		textColor: PanelBackground["textColor"];
	};
};

export type IframePanel = BasePanel & {
	type: "iframe";
	content: {
		url: string;
	};
};

export type Panel = ImagePanel | VideoPanel | TextPanel;

export type DisplayPanel = {
	id: Panel["id"];
	showFor: Panel["showFor"];
} & (
	| {
			type: ImagePanel["type"];
			content: ImagePanel["content"];
	  }
	| {
			type: VideoPanel["type"];
			content: VideoPanel["content"];
	  }
	| {
			type: TextPanel["type"];
			content: TextPanel["content"];
	  }
);

export type PanelBackground = {
	id: number;
	fileName: string;
	textColor: string;
	disabled: boolean;
};

export type Canteen = {
	snack: string | null;
	soup: string | null;
	lunch1: string | null;
	lunch2: string | null;
	lunch3: string | null;
	commonSuffix: string | null;
};

export type Departures = {
	ladova: Departure[];
	natrati: Departure[];
	vlak: Departure[];
};

export type Departure = {
	carrier: "DPMO" | "CD" | "other";
	line: string;
	time: string;
	delay: string | null;
	destination: string;
};

export type Theme = (typeof themes)[number];

export type Configuration = {
	theme: Theme;
	timetableEnabled: boolean;
	canteenEnabled: boolean;
	departuresEnabled: boolean;
};

export type ClientState = Configuration & {
	online: boolean;
	panels: DisplayPanel[];
	canteen: Canteen;
	departures: Departures;
};

export type Only<T, U> = {
	[P in keyof T]: T[P];
} & {
	[P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type FunctionDetails<F> = F extends (...args: infer Args) => infer Result ? { args: Args; result: Result } : never;

export type AsyncFunctionDetails<F> = F extends (...args: infer Args) => Promise<infer Result> ? { args: Args; result: Result } : never;
