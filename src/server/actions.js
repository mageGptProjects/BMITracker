import HttpError from '@wasp/core/HttpError.js'

export const createRecord = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const record = await context.entities.Record.create({
    data: {
      bmi: args.bmi,
      date: new Date(),
      user: { connect: { id: context.user.id } }
    }
  });

  return record;
}

export const deleteRecord = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const record = await context.entities.Record.findUnique({
    where: { id: args.id }
  });
  if (record.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Record.delete({
    where: { id: args.id }
  });

  return "Record successfully deleted.";
}