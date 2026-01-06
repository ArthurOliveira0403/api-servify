/* eslint-disable @typescript-eslint/await-thenable */
import { NotFoundException } from '@nestjs/common';
import { Service } from 'src/domain/entities/service';
import { ServiceRespository } from 'src/domain/repositories/service.repository';

export class InMemoryServiceRepository implements ServiceRespository {
  public services: Service[] = [];

  async save(service: Service): Promise<void> {
    await this.services.push(service);
  }

  async findById(id: string): Promise<Service | null> {
    const service = await this.services.find((s) => s.id === id);
    return service ?? null;
  }

  async findManyByCompany(companyId: string): Promise<Service[] | []> {
    const services = await this.services.filter(
      (s) => s.companyId === companyId,
    );
    return services ?? [];
  }

  async update(service: Service): Promise<void> {
    const index = await this.services.findIndex((s) => s.id === service.id);
    if (index === -1) throw new NotFoundException('Service not found');

    this.services[index] = service;
  }

  async delete(id: string): Promise<void> {
    const index = await this.services.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Service not found');

    await this.services.splice(index, 1);
  }
}
