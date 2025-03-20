import { Dispatch, SetStateAction } from "react";
import {
    PanelDataTypes,
    PanelEventTypes,
    ThemeNames,
    UserTypes,
} from "./constants";

export type User = {
    id: number;
    microsoftId: string;
    name: string;
    email: string;
    type: (typeof UserTypes)[number];
    colors: {
        light: string;
        dark: string;
    };
};

/*----------------------------------------*\
|    Panels                                |
\*----------------------------------------*/

export type Panel = {
    id: number;
    author: User["id"];
    showFrom: Date;
    showTill: Date;
    isApproved: boolean | null;
    visibilityOverride: boolean | null;
    panelData: PanelData["id"];
    displayDuration: number;
};

type PanelDataBase = {
    id: number;
    type: (typeof PanelDataTypes)[number];
};

export type ImagePanel = PanelDataBase & {
    type: "image";
    content: {
        url: string;
    };
};

export type VideoPanel = PanelDataBase & {
    type: "video";
    content: {
        url: string;
    };
};

export type TextPanel = PanelDataBase & {
    type: "text";
    content: {
        content: string;
        backgroundImage: PanelBackground["id"];
        textColor: PanelBackground["textColor"];
    };
};

export type IframePanel = PanelDataBase & {
    type: "iframe";
    content: {
        url: string;
    };
};

export type PanelData = ImagePanel | VideoPanel | TextPanel | IframePanel;

export type PanelBackground = {
    id: number;
    url: string;
    textColor: string;
    disabled: boolean;
};

/*----------------------------------------*\
|    Panel events                          |
\*----------------------------------------*/

type PanelEventBase = {
    id: number;
    panel: Panel["id"];
    author: User["id"];
    sentAt: Date;
    type: (typeof PanelEventTypes)[number];
    data: object;
    hidden: boolean;
};

export type UserRequestAddPanel = PanelEventBase & {
    type: "user:request:addPanel";
    data: {};
};

export type AdminAddPanel = PanelEventBase & {
    type: "admin:addPanel";
    data: {};
};

export type AdminAcceptPanel = PanelEventBase & {
    type: "admin:acceptPanel";
    data: {};
};

export type AdminRejectPanel = PanelEventBase & {
    type: "admin:rejectPanel";
    data: {};
};

export type AdminChangeTime = PanelEventBase & {
    type: "admin:change:time";
    data: {
        oldShowFrom: Date;
        oldShowTill: Date;
        newShowFrom: Date;
        newShowTill: Date;
    };
};

export type AdminChangeVisibilityOverride = PanelEventBase & {
    type: "admin:change:visibilityOverride";
    data: {
        newVisibility: boolean | null;
    };
};

export type AdminChangeDuration = PanelEventBase & {
    type: "admin:change:displayDuration";
    data: {
        oldDuration: number;
        newDuration: number;
    };
};

export type AdminChangePanelData = PanelEventBase & {
    type: "admin:change:panelData";
    data: {
        oldContent: string;
        newContent: string;
    };
};

export type PanelEvent =
    | UserRequestAddPanel
    | AdminAddPanel
    | AdminAcceptPanel
    | AdminRejectPanel
    | AdminChangeTime
    | AdminChangeVisibilityOverride
    | AdminChangeDuration
    | AdminChangePanelData;

/*----------------------------------------*\
|    Client types                          |
\*----------------------------------------*/

export type Configuration = {
    theme: Theme;
    timetableEnabled: boolean;
    canteenEnabled: boolean;
    departuresEnabled: boolean;
};

export type ClientState = Configuration & {
    online: boolean;
    panels: ClientPanelData[];
    canteen: Canteen;
    departures: Departures;
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

export type Theme = (typeof ThemeNames)[number];

export type ClientPanelData = PanelData & {
    displayDuration: Panel["displayDuration"];
};

/*----------------------------------------*\
|    Utilities                             |
\*----------------------------------------*/

export type Only<T, U> = {
    [P in keyof T]: T[P];
} & {
    [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type FunctionDetails<F> = F extends (...args: infer Args) => infer Result
    ? { args: Args; result: Result }
    : never;

export type AsyncFunctionDetails<F> = F extends (
    ...args: infer Args
) => Promise<infer Result>
    ? { args: Args; result: Result }
    : never;
