import { Theme } from "types";

export interface ThemeConfiguration {
    gytoolOutline: string;
    colors: {
        infoText: string;
        infoBackground: string;
        clockText: string;
        separator: string;
    };
}

export const themesConfig: Record<Theme, ThemeConfiguration> = {
    normal: {
        gytoolOutline: "#0062A3",
        colors: {
            infoText: "black",
            infoBackground: "white",
            clockText: "#0062A3",
            separator: "#cce0ed",
        },
    },
    dark: {
        gytoolOutline: "white",
        colors: {
            infoText: "white",
            infoBackground: "black",
            clockText: "white",
            separator: "white",
        },
    },
    light: {
        gytoolOutline: "black",
        colors: {
            infoText: "black",
            infoBackground: "white",
            clockText: "black",
            separator: "black",
        },
    },
};
