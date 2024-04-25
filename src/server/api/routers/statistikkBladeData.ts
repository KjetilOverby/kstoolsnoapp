
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
export const statistikkBladeDataRouter = createTRPCRouter({
 

   
    getAllHistorikk: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.bandhistorikk.findMany({
          where: {
              createdAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
          },
         })
      }),
      
    getAllCustomerHistorikk: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.bandhistorikk.findMany({
          where: {
            AND: [
              {
                createdAt: {
                  lte: new Date(input.date),
                  gte: new Date(input.date2),
                },
              },
              {
                bladeRelationId: {
                  startsWith: input.init,
                },
              },
            ]
          },
         })
      }),
   
   
      getAllHistorikkKS: protectedProcedure
      .input(z.object({date: z.string(), date2: z.string()}))
          .query(({ ctx, input }) => {
           return ctx.db.bandhistorikk.findMany({
            where: {
                datoSrv: {
                 lte: new Date(input.date),
                 gte: new Date(input.date2),
                },
            },
           })
        }),
 
        getAllHistorikkUpdate: protectedProcedure
        .input(z.object({date: z.string(), date2: z.string()}))
            .query(({ ctx, input }) => {
             return ctx.db.bandhistorikk.findMany({
              where: {
                  updatedAt: {
                   lte: new Date(input.date),
                   gte: new Date(input.date2),
                  },
              },
             })
          }),

           
      getAllHistorikkKScustomer: protectedProcedure
      .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
          .query(({ ctx, input }) => {
           return ctx.db.bandhistorikk.findMany({
            where: {
              AND: [
                {
                  datoSrv: {
                    lte: new Date(input.date),
                    gte: new Date(input.date2),
                  },
                },
                {
                  bladeRelationId: {
                    startsWith: input.init,
                  },
                },
              ]
            },
           })
        }),





})


 
