import {
  pgTable,
  varchar,
  boolean,
  uuid,
  timestamp,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("user_id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  firstName: varchar("first_name", { length: 25 }).notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  tickers: many(usersToTickers),
}));

export const usersToTickers = pgTable(
  "user_to_tickers",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    tickerId: varchar("ticker_id")
      .notNull()
      .references(() => tickers.id),
    isOwned: boolean("is_owned").notNull().default(false),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.tickerId] }),
  }),
);

export const usersToTickersRelations = relations(usersToTickers, ({ one }) => ({
  userId: one(users, {
    fields: [usersToTickers.tickerId],
    references: [users.id],
  }),
  tickerId: one(tickers, {
    fields: [usersToTickers.tickerId],
    references: [tickers.id],
  }),
}));

export const tickers = pgTable("tickers", {
  id: varchar("ticker_id").primaryKey(), // Ticker Symbol
  name: varchar("stock_name").notNull(),
  url: varchar("url"),
  indexId: varchar("index_id")
    .notNull()
    .references(() => indexes.id),
});

export const tickerRelations = relations(tickers, ({ one, many }) => ({
  users: many(usersToTickers),
  index: one(indexes, {
    fields: [tickers.indexId],
    references: [indexes.id],
  }),
}));

export const indexes = pgTable("indexes", {
  id: varchar("index_id").primaryKey(),
  name: varchar("name").notNull(),
});
