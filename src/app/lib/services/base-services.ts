import { Repository } from "@/app/lib/repositories/base-repository";
import { logError } from "@/app/utils/logError";
import { revalidatePath } from "next/cache";

export class BaseService<T, NewT, UpdateT> {
  private repository: Repository<T, NewT, UpdateT>;
  private entityName: string;
  private revalidatePath: string;

  constructor(
    repository: Repository<T, NewT, UpdateT>,
    entityName: string,
    revalidatePath: string
  ) {
    this.revalidatePath = revalidatePath;
    this.entityName = entityName;
    this.repository = repository;
  }

  async getOne(conditions: Partial<T>) {
    try {
      const { data } = await this.repository.find(conditions);
      return { data };
    } catch (error) {
      logError({
        error,
        message: `Failed to fetch ${this.entityName.toLowerCase()}`,
      });
      return { error: `Failed to fetch ${this.entityName.toLowerCase()}` };
    }
  }

  async getAll(params: {
    page: number;
    pageSize: number;
    conditions?: Partial<T>;
  }) {
    try {
      const { data, totalItems } = await this.repository.findAll(params);
      return { data, totalItems };
    } catch (error) {
      logError({
        error,
        message: `Failed to fetch ${this.entityName.toLowerCase()}s`,
      });
      return { error: `Failed to fetch ${this.entityName.toLowerCase()}s` };
    }
  }

  async create(data: NewT) {
    try {
      await this.repository.create(data);
      revalidatePath(this.revalidatePath, "page");
      return { success: `${this.entityName} created successfully` };
    } catch (error) {
      logError({
        error,
        message: `Failed to create ${this.entityName.toLowerCase()}`,
      });
      return { error: `Failed to create ${this.entityName.toLowerCase()}` };
    }
  }

  async update(params: { data: UpdateT; conditions: Partial<T> }) {
    try {
      const { numUpdatedRows } = await this.repository.update(params);
      if (!numUpdatedRows) {
        throw new Error("Not found entity to update");
      }

      revalidatePath(this.revalidatePath, "page");
      return { success: `${this.entityName} updated successfully` };
    } catch (error) {
      logError({
        error,
        message: `Failed to update ${this.entityName.toLowerCase()}`,
      });
      return { error: `Failed to update ${this.entityName.toLowerCase()}` };
    }
  }

  async remove(params: { conditions: Partial<T> }) {
    try {
      const { numDeletedRows } = await this.repository.remove(params);
      if (!numDeletedRows) {
        throw new Error("Not found entity to remove");
      }

      revalidatePath(this.revalidatePath, "page");
      return { success: `${this.entityName} removed successfully` };
    } catch (error) {
      logError({
        error,
        message: `Failed to remove ${this.entityName.toLowerCase()}`,
      });
      return { error: `Failed to remove ${this.entityName.toLowerCase()}` };
    }
  }
}
