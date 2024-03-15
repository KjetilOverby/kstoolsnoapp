// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { UserRole } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
 


  getUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({  });
  }),

  updateRole: protectedProcedure.input(z.object({id: z.string(), role: z.nativeEnum(UserRole)}))
  .mutation(async ({ctx, input}) => {
    const userId: string = ctx.session.user.id ?? "DefaultCreator";
      return ctx.db.user.update({
          where: {
            id: userId
          },
          data: {
             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
             role: input.role,

          
          }
      });
  }),

  updateRoleBrukere: protectedProcedure.input(z.object({email: z.string(), role: z.nativeEnum(UserRole)}))
  .mutation(async ({ctx, input}) => {
      return ctx.db.user.update({
          where: {
            email: input.email
          },
          data: {
             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
             role: input.role,
          }
      });
  }),


});
