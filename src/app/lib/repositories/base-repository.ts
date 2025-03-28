import { db } from "@/app/lib/db";
import { Database } from "@/app/lib/db/types";
import { ComparisonOperatorExpression } from "kysely";
import { UpdateObject } from "kysely";
import { OperandValueExpressionOrList } from "kysely";
import { InsertObject } from "kysely";
import { Kysely } from "kysely";

export type Repository<T, NewT, UpdateT> = {
  find: (conditions: Partial<T>) => Promise<{ data: T | null }>;
  findAll: (params: {
    page: number;
    pageSize: number;
    conditions?: Partial<T>;
  }) => Promise<{ data: T[]; totalItems: number }>;
  create: (data: NewT) => Promise<{ data: T }>;
  update: (params: {
    data: UpdateT;
    conditions: Partial<T>;
  }) => Promise<{ numUpdatedRows: number }>;
  remove: (params: {
    conditions: Partial<T>;
  }) => Promise<{ numDeletedRows: number }>;
};

export class BaseRepository<T, NewT, UpdateT>
  implements Repository<T, NewT, UpdateT>
{
  protected db: Kysely<Database>;
  protected tableName: keyof Database;

  constructor(tableName: keyof Database) {
    this.db = db;
    this.tableName = tableName;
  }

  async find(conditions: Partial<T>): Promise<{ data: T | null }> {
    let query = this.db.selectFrom(this.tableName).selectAll();

    const whereConditions = this.createWhereConditions(conditions);

    for (const { key, operator, value } of whereConditions) {
      query = query.where(key, operator, value);
    }

    const data = (await query.executeTakeFirst()) as T | null;
    return { data };
  }

  async findAll(params: {
    page: number;
    pageSize: number;
    conditions?: Partial<T>;
  }): Promise<{ data: T[]; totalItems: number }> {
    const { page, pageSize, conditions } = params;
    const offset = (page - 1) * pageSize;
    let query = this.db
      .selectFrom(this.tableName)
      .selectAll()
      .limit(pageSize)
      .offset(offset)
      .orderBy("created_at desc")
      .orderBy("updated_at desc");

    if (conditions) {
      const whereConditions = this.createWhereConditions(conditions);

      for (const { key, operator, value } of whereConditions) {
        query = query.where(key, operator, value);
      }
    }

    const data = (await query.execute()) as T[];

    let totalItemsQuery = this.db
      .selectFrom(this.tableName)
      .select(({ fn }) => fn.count<number>("created_at").as("total"));

    if (conditions) {
      const whereConditions = this.createWhereConditions(conditions);

      for (const { key, operator, value } of whereConditions) {
        totalItemsQuery = totalItemsQuery.where(key, operator, value);
      }
    }

    const totalItems = await totalItemsQuery.executeTakeFirst();

    return { data, totalItems: totalItems?.total || 0 };
  }

  async create(data: NewT): Promise<{ data: T }> {
    const newRecord = (await this.db
      .insertInto(this.tableName)
      .values(data as InsertObject<Database, keyof Database>)
      .returningAll()
      .executeTakeFirst()) as T;

    return { data: newRecord };
  }

  async update(params: {
    data: UpdateT;
    conditions: Partial<T>;
  }): Promise<{ numUpdatedRows: number }> {
    let query = this.db
      .updateTable(this.tableName)
      .set(
        params.data as UpdateObject<Database, keyof Database, keyof Database>
      );

    const whereConditions = this.createWhereConditions(params.conditions);

    for (const { key, operator, value } of whereConditions) {
      query = query.where(key, operator, value);
    }

    const { numUpdatedRows } = await query.executeTakeFirst();

    return { numUpdatedRows: Number(numUpdatedRows) };
  }

  async remove(params: {
    conditions: Partial<T>;
  }): Promise<{ numDeletedRows: number }> {
    let query = this.db.deleteFrom(this.tableName);

    const whereConditions = this.createWhereConditions(params.conditions);

    for (const { key, operator, value } of whereConditions) {
      query = query.where(key, operator, value);
    }

    const { numDeletedRows } = await query.executeTakeFirst();

    return { numDeletedRows: Number(numDeletedRows) };
  }

  private createWhereConditions(conditions: Partial<T>) {
    return Object.entries(conditions).map(([key, value]) => ({
      key: key as keyof Database[typeof this.tableName],
      operator: "=" as ComparisonOperatorExpression,
      value: value as OperandValueExpressionOrList<
        Database,
        typeof this.tableName,
        keyof Database[typeof this.tableName]
      >,
    }));
  }
}
