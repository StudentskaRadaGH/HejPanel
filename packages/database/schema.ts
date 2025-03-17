import {
    Activity,
    Panel,
    activityTypes,
    panelTypes,
    themes,
    userTypes,
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

export const ThemeEnum = pgEnum("theme", themes);

export const Config = pgTable("config", {
    theme: ThemeEnum("theme").notNull().default(themes[0]),
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

export const UserTypesEnum = pgEnum("user_type", userTypes);

export const Users = pgTable("users", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    microsoftId: varchar("microsoft_id", { length: 63 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    type: UserTypesEnum("type").notNull().default(userTypes[0]),
});

export const UsersRelations = relations(Users, ({ many }) => ({
    panels: many(Panels),
    threads: many(Threads),
    activities: many(Activities),
    notifications: many(Notifications),
}));

export const PanelTypesEnum = pgEnum("panel_type", panelTypes);

export const Panels = pgTable("panels", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    thread: integer("thread")
        .notNull()
        .references(() => Threads.id),
    author: integer("author")
        .notNull()
        .references(() => Users.id),
    showFrom: date("show_from", { mode: "date" }).notNull(),
    showTill: date("show_till", { mode: "date" }).notNull(),
    isApproved: boolean("is_approved").notNull().default(false),
    isHidden: boolean("is_hidden").notNull().default(false),
    isDeprecated: boolean("is_deprecated").notNull().default(false),
    type: PanelTypesEnum("type").notNull(),
    content: jsonb("content").notNull().$type<Panel["content"]>(),
});

export const PanelsRelations = relations(Panels, ({ one }) => ({
    thread: one(Threads, { fields: [Panels.thread], references: [Threads.id] }),
    author: one(Users, { fields: [Panels.author], references: [Users.id] }),
}));

export const PanelBackgrounds = pgTable("panel_backgrounds", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    fileName: varchar("fileName", { length: 255 }).notNull(),
    textColor: varchar("text_color", { length: 7 }).notNull(),
    disabled: boolean("deprecated").notNull().default(false),
});

export const Threads = pgTable("threads", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    owner: integer("owner")
        .notNull()
        .references(() => Users.id),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    lastActivityAt: timestamp("last_activity_at", {
        mode: "date",
        withTimezone: true,
    }).notNull(),
});

export const ThreadsRelations = relations(Threads, ({ one, many }) => ({
    owner: one(Users, { fields: [Threads.owner], references: [Users.id] }),
    panels: many(Panels),
    activities: many(Activities),
}));

export const ActivityTypesEnum = pgEnum("activity_type", activityTypes);

export const Activities = pgTable("activity", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    thread: integer("thread")
        .notNull()
        .references(() => Threads.id),
    author: integer("author")
        .notNull()
        .references(() => Users.id),
    sentAt: timestamp("sent_at", { mode: "date", withTimezone: true })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    type: ActivityTypesEnum("type").notNull(),
    data: jsonb("data").notNull().$type<Activity["data"]>(),
});

export const ActivitiesRelations = relations(Activities, ({ one }) => ({
    thread: one(Threads, {
        fields: [Activities.thread],
        references: [Threads.id],
    }),
    author: one(Users, { fields: [Activities.author], references: [Users.id] }),
}));

export const Notifications = pgTable("notification", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    recipient: integer("recipient")
        .notNull()
        .references(() => Users.id),
    sentAt: timestamp("sent_at", { mode: "date", withTimezone: true })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    title: varchar("title", { length: 255 }).notNull(),
    content: varchar("content", { length: 255 }).notNull(),
    path: varchar("path", { length: 255 }),
    read: boolean("is_read").notNull().default(false),
});

export const NotificationsRelations = relations(Notifications, ({ one }) => ({
    recipient: one(Users, {
        fields: [Notifications.recipient],
        references: [Users.id],
    }),
}));
