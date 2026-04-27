import { prisma } from '@/lib/prisma';

export async function moveDealToStage(
  dealId: string,
  newStageId: string,
  actorId?: string
): Promise<void> {
  // Получаем этап и проверяем что он существует
  const stage = await prisma.stage.findUniqueOrThrow({
    where: { id: newStageId },
    select: { id: true, pipelineId: true },
  });

  const deal = await prisma.deal.findUniqueOrThrow({
    where: { id: dealId },
    select: { id: true, stageId: true, pipelineId: true },
  });

  // Инвариант: этап должен принадлежать той же воронке что и сделка
  if (stage.pipelineId !== deal.pipelineId) {
    throw new Error(
      `Stage ${newStageId} belongs to pipeline ${stage.pipelineId}, but deal is in pipeline ${deal.pipelineId}`
    );
  }

  // Обновляем сделку и создаём событие атомарно
  await prisma.$transaction([
    prisma.deal.update({
      where: { id: dealId },
      data: { stageId: newStageId },
    }),
    prisma.dealStageEvent.create({
      data: {
        dealId,
        fromStageId: deal.stageId,
        toStageId: newStageId,
        actorId: actorId ?? null,
      },
    }),
  ]);
}
