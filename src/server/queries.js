import HttpError from '@wasp/core/HttpError.js'

export const getRecords = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Record.findMany({
    where: {
      userId: context.user.id
    },
    orderBy: {
      date: 'asc'
    }
  })
}

export const getRecord = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const record = await context.entities.Record.findUnique({
    where: { id: args.recordId, userId: context.user.id },
  });

  if (!record) { throw new HttpError(400) }

  return record;
}