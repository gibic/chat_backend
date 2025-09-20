import type { DBEntity } from '../models/db';

import type { IDatabaseResource } from './types';

export class SimpleInMemoryResource<T extends S & DBEntity, S>
  implements IDatabaseResource<T, S>
{
  data: Array<T> = [];
  async create(data: S): Promise<T> {
    const fulldata = {
      ...data,
      id: this.data.length.toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as T;
    this.data.push(fulldata);
    return fulldata;
  }
  async delete(id: string): Promise<T | null> {
    const entity = this.data.find(d => d.id === id) || null;
    if (entity) {
      this.data = [...this.data.filter(d => d.id !== entity.id)];
      return entity;
    } else {
      return null;
    }
  }
  async get(id: string): Promise<T | null> {
    return this.data.find(d => d.id === id) || null;
  }
  async find(data: Partial<S>): Promise<T | null> {
    return (
      this.data.find(d => {
        for (const key in data) {
          if (data[key] !== d[key]) {
            return false;
          }
        }
        return true;
      }) || null
    );
  }
  async findAll(data: Partial<S>): Promise<T[]> {
    const res = this.data.filter(d => {
      for (const key in data) {
        if (data[key] !== d[key]) return false;
      }
      return true;
    });
    return res;
  }
  async update(id: string, data: Partial<S>): Promise<T | null> {
    const entity = await this.get(id);
    if (entity) {
      const newEntity = { ...entity, ...data, updateAt: Date.now() };
      await this.delete(id);
      this.data.push(newEntity);
      return newEntity;
    } else {
      return null;
    }
  }
}
