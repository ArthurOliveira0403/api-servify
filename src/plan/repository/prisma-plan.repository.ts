import { PrismaService } from 'src/database/database.service';
import { Plan } from '../entities/plan';
import { PlanRepository } from './plan.repository';
import { TypeConverter } from './helpers/type-converter.helper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPlanRepository implements PlanRepository {
  constructor(private prisma: PrismaService) {}

  async save(plan: Plan): Promise<void> {
    await this.prisma.plan.create({
      data: {
        id: plan.id,
        name: plan.name,
        type: TypeConverter.toPrisma(plan.type),
        price: plan.price,
        description: plan.description,
      },
    });
  }

  async findAll(): Promise<Plan[] | []> {
    const plans = await this.prisma.plan.findMany();

    if (!plans) return [];

    const plansFound = plans.map(
      (p) =>
        new Plan({
          id: p.id,
          name: p.name,
          type: TypeConverter.toReturn(p.type),
          price: p.price,
          description: p.description,
        }),
    );

    return plansFound;
  }

  async findByName(name: string): Promise<Plan | null> {
    const plan = await this.prisma.plan.findUnique({ where: { name } });

    if (!plan) return null;

    const planFound = new Plan({
      id: plan.id,
      name: plan.name,
      type: TypeConverter.toReturn(plan.type),
      price: plan.price,
      description: plan.description,
    });

    return planFound;
  }

  async findById(id: string): Promise<Plan | null> {
    const plan = await this.prisma.plan.findUnique({ where: { id } });

    if (!plan) return null;

    const planFound = new Plan({
      id: plan.id,
      name: plan.name,
      type: TypeConverter.toReturn(plan.type),
      price: plan.price,
      description: plan.description,
    });

    return planFound;
  }

  async update(plan: Plan): Promise<void> {
    await this.prisma.plan.update({
      where: { id: plan.id },
      data: {
        name: plan.name,
        price: plan.price,
        type: TypeConverter.toPrisma(plan.type),
        description: plan.description,
      },
    });
  }
}
