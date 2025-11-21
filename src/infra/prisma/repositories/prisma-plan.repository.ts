import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PlanRepository } from 'src/domain/repositories/plan.repository';
import { Injectable } from '@nestjs/common';
import { Plan } from 'src/domain/entities/plan';
import { TypeConverter } from 'src/infra/prisma/helpers/type-converter.helper';
import { PrismaPlanMapper } from '../mappers/prisma-plan.mapper';

@Injectable()
export class PrismaPlanRepository implements PlanRepository {
  constructor(private prisma: PrismaService) {}

  async save(plan: Plan): Promise<void> {
    const row = PrismaPlanMapper.toPrisma(plan);

    await this.prisma.plan.create({
      data: { ...row },
    });
  }

  async findAll(): Promise<Plan[] | []> {
    const plans = await this.prisma.plan.findMany();

    if (!plans) return [];

    const plansFound = plans.map(
      (p) =>
        new Plan({
          ...p,
          type: TypeConverter.toDomain(p.type),
        }),
    );

    return plansFound;
  }

  async findByName(name: string): Promise<Plan | null> {
    const plan = await this.prisma.plan.findUnique({ where: { name } });

    if (!plan) return null;

    const planFound = new Plan({
      ...plan,
      type: TypeConverter.toDomain(plan.type),
    });

    return planFound;
  }

  async findById(id: string): Promise<Plan | null> {
    const plan = await this.prisma.plan.findUnique({ where: { id } });

    if (!plan) return null;

    const planFound = new Plan({
      ...plan,
      type: TypeConverter.toDomain(plan.type),
    });

    return planFound;
  }

  async update(plan: Plan): Promise<void> {
    const row = PrismaPlanMapper.toPrisma(plan);

    await this.prisma.plan.update({
      where: { id: plan.id },
      data: { ...row },
    });
  }
}
