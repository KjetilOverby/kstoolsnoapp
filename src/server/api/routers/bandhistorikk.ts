// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
export const bandhistorikkRouter = createTRPCRouter({

    countAllHistorikk: protectedProcedure
        .query(({ ctx, }) => {
         return ctx.db.bandhistorikk.count({
       
         })
      }),

      countAllSagtid: protectedProcedure
  .query(async ({ ctx }) => {
    const records = await ctx.db.bandhistorikk.findMany({});
    const sum = records.reduce((acc, record) => acc + record.sagtid, 0);
    return sum;
  }),
    
      create: protectedProcedure
      .input(z.object({ sagNr: z.string(), datoInn: z.date(), klInn: z.date(), klUt: z.date(), datoUt: z.date(),ampere: z.number(), feilkode: z.string(), anmSag: z.string(), temperatur: z.number(), userId: z.string(),  handling: z.string(), sideklaring: z.number(), sgSag: z.string(), datoSrv: z.date(),createdById: z.string(), bladedata: z.string(), anmKS: z.string(), createdBy: z.string(), sagtid:z.number(), sgKS: z.string(), creatorImg: z.string(), side: z.string(), bladType: z.string(), activePost: z.boolean(), bladeRelationId: z.string(), alt: z.string(), creator: z.string(), creator2: z.string(), creatorImg2: z.string(), creator3: z.string(), creatorImg3: z.string() }))
      .mutation(({ ctx, input }) => {
        const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
        const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
    
     return ctx.db.bandhistorikk.create({
         data: {
             sagNr: input.sagNr,
             datoInn: input.datoInn,
             datoUt: input.datoUt,
             klInn: input.klInn,
             klUt: input.klUt,
             ampere: input.ampere,
             feilkode: input.feilkode,
             sideklaring: input.sideklaring,
             anmSag: input.anmSag,
             temperatur: input.temperatur,
             creator: creatorName,
             userId: '',
             sagtid: input.sagtid,
             sgSag: input.sgSag,
             anmKS: input.anmKS,
             handling: input.handling,
             datoSrv: input.datoSrv,
             sgKS: input.sgKS,
             createdBy: { connect: { id: ctx.session.user.id} },
             bladedata: { connect: { id: input.bladedata} },
             creatorImg: creatorImg,
             side: input.side,
             bladType: input.bladType,
             activePost: input.activePost,
             bladeRelationId: input.bladeRelationId,
             alt: input.alt,
             creator2: '',
              creatorImg2: '',
             creator3: '',
              creatorImg3: '',
              stokkAnt: 0

             

         },
       
     })

     
 
  }),
  delete: protectedProcedure.input(z.object({id: z.string()}))
  .mutation(async ({ctx, input}) => {
      return ctx.db.bandhistorikk.delete({
          
          where: {
              id: input.id
          },
      });
  }),
  update: protectedProcedure.input(z.object({ id: z.string(), activePost: z.boolean(), datoInn: z.date(), klInn: z.date(), klUt: z.date(), datoUt: z.date(), feilkode: z.string(), temperatur: z.number(), anmSag: z.string(), sgSag: z.string(), sagtid: z.number(), sagNr: z.string(), creator2: z.string(), creatorImg2: z.string(), ampere: z.number()}))
  .mutation(async ({ctx, input}) => {
    const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
    const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
      return ctx.db.bandhistorikk.update({
          where: {
              id: input.id
          },
          data: {
             
              activePost: input.activePost,
              datoInn: input.datoInn,
              klInn: input.klInn,
              klUt: input.klUt,
              datoUt: input.datoUt,
              feilkode: input.feilkode,
              temperatur: input.temperatur,
              anmSag: input.anmSag,
              sgSag: input.sgSag,
              sagtid: input.sagtid,
              sagNr: input.sagNr,
              creator2: creatorName,
              creatorImg2: creatorImg,
              ampere: input.ampere
            
            
          
          }
      });
  }),

  updateKS: protectedProcedure.input(z.object({anmKS: z.string(), id: z.string(), handling: z.string(), sgKS: z.string(), datoSrv: z.date(), sideklaring: z.number(), creator3: z.string(), creatorImg3: z.string()}))
  .mutation(async ({ctx, input}) => {
    const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
        const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
      return ctx.db.bandhistorikk.update({
          where: {
              id: input.id
          },
          data: {
              anmKS: input.anmKS,
              updatedAt: new Date(),
              handling: input.handling,
              sgKS: input.sgKS,
              datoSrv: input.datoSrv,
              sideklaring: input.sideklaring,
              creator3: creatorName,
              creatorImg3: creatorImg,
            
            
          
          }
      });
  }),

  countTimerSag: protectedProcedure
  .input(z.object({date: z.string(), date2: z.string()}))
  .query(async ({ ctx, input }) => {
    const sagNrList = await ctx.db.bandhistorikk.findMany({
        where: {
           datoUt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
        },
      select: {
        sagNr: true
      },
      distinct: ['sagNr']
    });

    const result = await Promise.all(sagNrList.map(async (item) => {
      const countSagNr = await ctx.db.bandhistorikk.count({
        where: {
          sagNr: item.sagNr,
          datoUt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        }
      });

      const sagtidList = await ctx.db.bandhistorikk.findMany({
        where: {
          sagNr: item.sagNr,
          datoUt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        },
        select: {
          sagtid: true,
        }
      });

      const totalSagtid = sagtidList.reduce((sum, sag) => sum + sag.sagtid, 0);

      return {
        sagNr: item.sagNr,
        totalSagtid: totalSagtid,
        countSagNr: countSagNr
      };
    }));

    return result;
  }),


  //************ countTimerSagCustomer ****************
  countTimerSagCustomer: protectedProcedure
  .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
  .query(async ({ ctx, input }) => {
    const sagNrList = await ctx.db.bandhistorikk.findMany({
        where: { 
            AND: [{
              datoUt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              bladeRelationId: {startsWith :input.init},
              
             
            }],
         
          },
      select: {
        sagNr: true,
       
      },
      distinct: ['sagNr']
    });

    const result = await Promise.all(sagNrList.map(async (item) => {
      const countSagNr = await ctx.db.bandhistorikk.count({
        where: {
          sagNr: item.sagNr,
          bladeRelationId: {startsWith :input.init},
          datoUt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
        }
      });

      const sagtidList = await ctx.db.bandhistorikk.findMany({
        where: {
          sagNr: item.sagNr,
          bladeRelationId: {startsWith :input.init},
          datoUt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        },
        select: {
          sagtid: true,
        }
      });

      const totalSagtid = sagtidList.reduce((sum, sag) => sum + sag.sagtid, 0);

      return {
        sagNr: item.sagNr,
        totalSagtid: totalSagtid,
        countSagNr: countSagNr
      };
    }));

    return result;
  }),
  //************ countTimerSagCustomer ****************



    //************ SERVICE ****************
    bfsServiceData: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string()}))
    .query(async ({ ctx, input }) => {
      const handlingData = await ctx.db.bandhistorikk.findMany({
        select: {
          handling: true,
        },
        where: {
          updatedAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        }
      });
  
      const handlingCounts = {
        'Ingen handling': 0,
        'BFS423': 0,
        'BFS426': 0,
        'BFS427': 0,
        'BFS429': 0,
        'BSF438': 0,
        'BFS442': 0,
      };
  
      handlingData.forEach(data => {
        const handlings = data.handling.split(', ');
        handlings.forEach(handling => {
          if (handling in handlingCounts) {
            handlingCounts[handling]++;
          }
        });
      });
  
      return handlingCounts;
    }),
    bfsServiceDataCustomer: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
    .query(async ({ ctx, input }) => {
      const handlingData = await ctx.db.bandhistorikk.findMany({
        select: {
          handling: true,
        },
        where: {
          updatedAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
          bladeRelationId: {startsWith :input.init},
        }
      });
  
      const handlingCounts = {
        'Ingen handling': 0,
        'BFS423': 0,
        'BFS426': 0,
        'BFS427': 0,
        'BFS429': 0,
        'BSF438': 0,
        'BFS442': 0,
      };
  
      handlingData.forEach(data => {
        const handlings = data.handling.split(', ');
        handlings.forEach(handling => {
          if (handling in handlingCounts) {
            handlingCounts[handling]++;
          }
        });
      });
  
      return handlingCounts;
    }),


    feilkoder: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string()}))
    .query(async ({ ctx, input }) => {
        const feilkoder = await ctx.db.bandhistorikk.groupBy({
                  by: ['feilkode', 'sagNr'], // Include 'sagNr' in the groupBy clause
                  _count: true,
                  where: {
                  updatedAt: {
                        lte: new Date(input.date),
                        gte: new Date(input.date2),
                      },
                  }
                });
  
      return feilkoder;
    }),


    feilkoderCustomer: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
    .query(async ({ ctx, input }) => {
        const feilkoder = await ctx.db.bandhistorikk.groupBy({
                  by: ['feilkode', 'sagNr'], // Include 'sagNr' in the groupBy clause
                  _count: true,
                  where: {
                  updatedAt: {
                        lte: new Date(input.date),
                        gte: new Date(input.date2),
                      },
                      bladeRelationId: {startsWith :input.init},
                  }
                });
  
      return feilkoder;
    }),

    


//   countSawbladesCustomer: protectedProcedure
//   .input(z.object({init: z.string()}))
//   .query(async ({ ctx, input }) => {
//     const countCustomer = await ctx.db.sawblades.groupBy({
//       by: ['type', 'side', 'deleted'],
//       _count: true,
//       where: {
//         IdNummer: {
//           startsWith: input.init
//         }
//       }
//     });

//     return countCustomer;
//   }),

 
})




 

 


