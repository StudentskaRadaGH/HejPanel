import {
    PanelData,
    PanelDataTypes,
    PanelEvent,
    PanelEventTypes,
    ThemeNames,
    UserTypes,
} from "types";
import {
    boolean,
    date,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const ThemeEnum = pgEnum("theme", ThemeNames);

export const Config = pgTable("config", {
    theme: ThemeEnum("theme").notNull().default(ThemeNames[0]),
    timetableEnabled: boolean("timetable_enabled").notNull().default(true),
    canteenEnabled: boolean("canteen_enabled").notNull().default(true),
    departuresEnabled: boolean("departures_enabled").notNull().default(true),
});

export const Canteens = pgTable("canteen", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    date: integer("date").notNull().unique(),
    soup: varchar("soup", { length: 255 }),
    snack: varchar("snack", { length: 255 }),
    lunch1: varchar("lunch1", { length: 255 }),
    lunch2: varchar("lunch2", { length: 255 }),
    lunch3: varchar("lunch3", { length: 255 }),
    commonSuffix: varchar("common_suffix", { length: 255 }),
});

export const UserTypesEnum = pgEnum("user_type", UserTypes);

export const Users = pgTable("users", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    microsoftId: varchar("microsoft_id", { length: 63 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    type: UserTypesEnum("type").notNull().default(UserTypes[0]),
});

export const UsersRelations = relations(Users, ({ many }) => ({
    panels: many(Panels),
    panelEvents: many(PanelEvents),
}));

export const Panels = pgTable("panels", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    author: integer("author")
        .notNull()
        .references(() => Users.id),
    showFrom: date("show_from", { mode: "date" }).notNull(),
    showTill: date("show_till", { mode: "date" }).notNull(),
    isApproved: boolean("is_approved"),
    visibilityOverride: boolean("visibility_override"),
    panelData: integer("panel_data")
        .notNull()
        .references(() => PanelDataStore.id),
    displayDuration: integer("display_duration").notNull().default(15),
});

export const PanelsRelations = relations(Panels, ({ one, many }) => ({
    author: one(Users, { fields: [Panels.author], references: [Users.id] }),
    panelData: one(PanelDataStore, {
        fields: [Panels.panelData],
        references: [PanelDataStore.id],
    }),
    panelEvents: many(PanelEvents),
}));

export const PanelDataTypesEnum = pgEnum("panel_type", PanelDataTypes);

export const PanelDataStore = pgTable("panel_data", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    type: PanelDataTypesEnum("type").notNull(),
    content: jsonb("content").notNull().$type<PanelData["content"]>(),
});

export const PanelBackgrounds = pgTable("panel_backgrounds", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    url: varchar("url", { length: 511 }).notNull(),
    textColor: varchar("text_color", { length: 7 }).notNull(),
    disabled: boolean("deprecated").notNull().default(false),
});

export const PanelEventTypesEnum = pgEnum("panel_event_type", PanelEventTypes);

export const PanelEvents = pgTable("panel_events", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    panel: integer("panel")
        .notNull()
        .references(() => Panels.id),
    author: integer("author")
        .notNull()
        .references(() => Users.id),
    sentAt: timestamp("sent_at", { mode: "date", withTimezone: true })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    type: PanelEventTypesEnum("type").notNull(),
    data: jsonb("data").notNull().$type<PanelEvent["data"]>(),
    hidden: boolean("hidden").notNull().default(false),
});

export const PanelEventsRelations = relations(PanelEvents, ({ one }) => ({
    panel: one(Panels, {
        fields: [PanelEvents.panel],
        references: [Panels.id],
    }),
    author: one(Users, {
        fields: [PanelEvents.author],
        references: [Users.id],
    }),
}));
