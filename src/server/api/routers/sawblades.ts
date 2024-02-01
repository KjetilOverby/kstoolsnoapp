// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
export const sawbladesRouter = createTRPCRouter({
  // getAll: protectedProcedure
  // .query(({ ctx }) => {
 
  // return ctx.db.sawblades.findMany({});

   
    // getAll: protectedProcedure.input(z.object({ IdNummer: z.string()}))
    //     .query(({ ctx, input }) => {
    //      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //      return ctx.db.sawblades.findMany({
    //       where:{ 
    //         IdNummer: input.IdNummer
    //       }
    //      })
    //   }),

    getAll: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.sawblades.findMany({
          where: {
            AND: [{
              createdAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
              IdNummer: {contains: input.IdNummer ? input.IdNummer : undefined},
            }]
          },
          orderBy: {
            IdNummer: 'asc'
                          },
            include: {
              _count: {
                select: {
                  bandhistorikk: true,
                },
              },
              bandhistorikk: {
                orderBy: {
                  createdAt: 'asc'
                }
              },
            },
         })
      }),


    getAllDeleted: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string(),}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          where: {
            AND: [{
              updatedAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
              deleted: true,
              IdNummer: {contains: input.IdNummer ? input.IdNummer : undefined},
            }]
          },
          orderBy: {
            updatedAt: 'asc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              orderBy: {
                                createdAt: 'asc'
                              }
                            },
                          },
         })
      }),

      getActive: protectedProcedure
      .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string(), init: z.string()}))
          .query(({ ctx, input }) => {
           // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
           return ctx.db.sawblades.findMany({
            where: {
              AND: [{
               
                active: true,
                 IdNummer: {startsWith: input.init},
              }]
            },
            orderBy: {
              IdNummer: 'asc'
                            },
                            include: {
                              _count: {
                                select: {
                                  bandhistorikk: true,
                                },
                              },
                              bandhistorikk: {
                                orderBy: {
                                  createdAt: 'asc'
                                }
                              },
                            },
           })
        }),

    getCustomerAllDeleted: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          where: {
            AND: [{
              updatedAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
              deleted: true,
              IdNummer: {contains: input.IdNummer ? input.IdNummer : undefined, startsWith: input.init},
            }]
          },
          orderBy: {
            updatedAt: 'asc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              orderBy: {
                                createdAt: 'asc'
                              }
                            },
                          },
         })
      }),

  


   
    getCustomer: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          where: {
            AND: [{
              createdAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
              IdNummer: {contains: input.IdNummer ? input.IdNummer : undefined, startsWith: input.init},
            }]
          },
          orderBy: {
            IdNummer: 'asc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              orderBy: {
                                createdAt: 'asc'
                              }
                            },
                          },
         })
      }),
   
    getCustomerActive: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          where: {
            AND: [{
             
              active: true,
               IdNummer: {startsWith: input.init},
            }]
          },
          orderBy: {
            IdNummer: 'asc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              orderBy: {
                                createdAt: 'asc'
                              }
                            },
                          },
         })
      }),
 

   delete: protectedProcedure.input(z.object({id: z.string()}))
    .mutation(async ({ctx, input}) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return ctx.db.sawblades.delete({
            where: {
                id: input.id
            },
        });
    }),

    
      create: protectedProcedure
      .input(z.object({ IdNummer: z.string(), type: z.string(), deleted: z.boolean(), note: z.string(), kunde: z.string(), side: z.string(), active: z.boolean(), deleteReason: z.string(), produsent: z.string(), creatorImg: z.string(), deleter: z.string(), deleterImg: z.string() }))
      .mutation(({ ctx, input }) => {
        const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
        const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
    
     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
     return ctx.db.sawblades.create({
         data: {
             IdNummer: input.IdNummer,
             type: input.type,
             deleted: false,
             note: input.note,
             userId: ctx.session.user.id,
             creator: creatorName,
             creatorImg: creatorImg,
             kunde: input.kunde,
             createdBy: { connect: { id: ctx.session.user.id} },
             side: input.side,
             active: input.active,
             deleteReason: input.deleteReason,
             produsent: input.produsent,
             deleter: '',
             deleterImg: ''
         },
     })
  }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),
  update: protectedProcedure.input(z.object({deleted: z.boolean(), id: z.string(), deleteReason: z.string()}))
  .mutation(async ({ctx, input}) => {
    const deleterName: string = ctx.session.user.name ?? "DefaultCreator";
    const deleterImg: string = ctx.session.user.image ?? "DefaultCreator";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.update({
          where: {
              id: input.id
          },
          data: {
              deleted: input.deleted,
              deleteReason: input.deleteReason,
              deleter: deleterName,
              deleterImg: deleterImg
          
          }
      });
  }),


  updateStatus: protectedProcedure.input(z.object({active: z.boolean(), id: z.string()}))
  .mutation(async ({ctx, input}) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.update({
          where: {
              id: input.id
          },
          data: {
              active: input.active,
          
          }
      });
  }),


})


 

 

    // export const postRouter = createTRPCRouter({
    //     hello: publicProcedure
    //       .input(z.object({ text: z.string() }))
    //       .query(({ input }) => {
    //         return {
    //           greeting: `Hello ${input.text}`,
    //         };
    //       }),


 
//      create: protectedProcedure
//      .input(z.object({ serial: z.string(), type: z.string() }))
//      .mutation(({ ctx, input }) => {
   
//     return ctx.db.sawblades.create({
//         data: {
//             serial: input.serial,
//             type: input.type,
//             userId: ctx.session.user.id,
//         }
//     })

//  })
//  })


