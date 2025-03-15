export const userTypes = ["suspended", "user", "admin", "super-admin"] as const;

export const panelTypes = ["text", "image", "video", "iframe"] as const;

export const activityTypes = ["user:request:addPanel", "admin:accept", "admin:reject", "admin:addPanel", "admin:changeTime", "admin:changeVisibility", "admin:changeShowFor", "admin:changeContent"] as const;

export const themes = ["normal", "dark", "light"] as const;
