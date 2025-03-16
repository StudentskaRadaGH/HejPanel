import { CSSProperties, createContext, useContext } from "react";
import { Canteen, ClientState, Departures, DisplayPanel, Theme } from "types";
import { ThemeConfiguration, themesConfig } from "./assets/themes";

interface ThemeContextType extends ThemeConfiguration {
    name: Theme;
    cssVariables: CSSProperties;
}

const getThemeContext = (theme: Theme): ThemeContextType => {
    const themeConfig = themesConfig[theme];
    const cssVariables: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(themeConfig.colors)) {
        cssVariables[`--${key}`] = value;
    }

    return {
        ...themeConfig,
        name: theme,
        cssVariables,
    };
};

const ClientStateContext = createContext<ClientState | undefined>(undefined);

export const ClientStateProvider = ({
    children,
    clientState,
}: {
    children: React.ReactNode;
    clientState: ClientState;
}) => {
    return (
        <ClientStateContext.Provider value={clientState}>
            {children}
        </ClientStateContext.Provider>
    );
};

const useClientStateContext = () => {
    const context = useContext(ClientStateContext);

    if (context === undefined)
        throw new Error(
            "useClientStateContext must be used within a ClientStateProvider",
        );

    return context;
};

export const useOnline = (): boolean => useClientStateContext().online;

export const usePanels = (): DisplayPanel[] => useClientStateContext().panels;

export const useTheme = (): ThemeContextType =>
    getThemeContext(useClientStateContext().theme);

export const useTimetableEnabled = (): boolean =>
    useClientStateContext().timetableEnabled;

export const useCanteenEnabled = (): boolean =>
    useClientStateContext().canteenEnabled;

export const useCanteen = (): Canteen => useClientStateContext().canteen;

export const useDeparturesEnabled = (): boolean =>
    useClientStateContext().departuresEnabled;

export const useDepartures = (): Departures =>
    useClientStateContext().departures;
