export const UserTypes = ["suspended", "user", "admin", "super-admin"] as const;

export const PanelDataTypes = ["text", "image", "video", "iframe"] as const;

export const PanelEventTypes = [
    "user:request:addPanel",
    "admin:acceptPanel",
    "admin:rejectPanel",
    "admin:addPanel",
    "admin:change:time",
    "admin:change:visibilityOverride",
    "admin:change:displayDuration",
    "admin:change:panelData",
] as const;

export const ThemeNames = ["normal", "dark", "light"] as const;
