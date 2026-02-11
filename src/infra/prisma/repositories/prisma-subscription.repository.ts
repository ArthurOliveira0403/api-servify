import type { SubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { PrismaService } from '../prisma.service';
import { Subscription } from 'src/domain/entities/subscription';
import { PrismaSubscriptionMapper } from '../mappers/prisma-subscription.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaSubscriptionRepository implements SubscriptionRepository {
  constructor(private prisma: PrismaService) {}

  async save(subscription: Subscription): Promise<void> {
    const row = PrismaSubscriptionMapper.toPrisma(subscription);

    await this.prisma.subscription.create({ data: { ...row } });
  }

  async findById(id: string): Promise<Subscription | null> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });

    return subscription
      ? PrismaSubscriptionMapper.toDomain(subscription)
      : null;
  }

  async findByCompanyId(companyId: string): Promise<Subscription[] | []> {
    const subscriptionsExist = await this.prisma.subscription.findMany({
      where: { company_id: companyId },
    });

    if (subscriptionsExist.length === 0) return [];

    const subscriptions = subscriptionsExist.map((s) =>
      PrismaSubscriptionMapper.toDomain(s),
    );

    return subscriptions;
  }

  async listActiveSubscriptionOfCompany(
    companyId: string,
  ): Promise<Subscription | null> {
    const subscriptionExist = await this.prisma.subscription.findFirst({
      where: {
        company_id: companyId,
        status: 'ACTIVE',
      },
    });

    if (!subscriptionExist) return null;

    return PrismaSubscriptionMapper.toDomain(subscriptionExist);
  }

  async listAll(): Promise<Subscription[] | []> {
    const subscriptions = await this.prisma.subscription.findMany();

    return subscriptions
      ? subscriptions.map((s) => PrismaSubscriptionMapper.toDomain(s))
      : [];
  }

  async update(subscription: Subscription): Promise<void> {
    const raw = PrismaSubscriptionMapper.toPrisma(subscription);

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: raw,
    });
  }
}
