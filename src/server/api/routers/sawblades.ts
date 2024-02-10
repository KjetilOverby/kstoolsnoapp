/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

    getAllcreate: protectedProcedure
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
            IdNummer: 'desc'
                          },
       
         })
      }),


    getAll: protectedProcedure
    .input(z.object({IdNummer: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.sawblades.findMany({
          take: 5,
          where: {
            AND: [{
            
              IdNummer: {contains: input.IdNummer ? input.IdNummer : undefined},
            }]
          },
          orderBy: {
            IdNummer: 'desc'
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
    .input(z.object({ IdNummer: z.string(),}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          take: 5,
          where: {
            AND: [{
           
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
    getAllDeletedStats: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string(),}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
         
          where: {
            AND: [{
              createdAt: {
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
      .input(z.object({IdNummer: z.string(), init: z.string()}))
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
    .input(z.object({IdNummer: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          take: 5,
          where: {
            AND: [{
             
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
    getCustomerAllDeletedStats: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(),IdNummer: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
        
          where: {
            AND: [{
              createdAt: {
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
    .input(z.object({IdNummer: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          skip: 5,
          take: 5,
          where: {
            
              IdNummer: {contains: input.IdNummer ? input.IdNummer : undefined, startsWith: input.init},
           
          },
          orderBy: {
            IdNummer: 'desc'
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
    .input(z.object({IdNummer: z.string(), init: z.string()}))
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


  
     getAllNoInput: protectedProcedure
     .input(z.object({init: z.string()}))
          .query(({ ctx, input }) => {
           return ctx.db.sawblades.findMany({
            where: {
              IdNummer: {startsWith: input.init},
            }
           })
        }),
  
     getAllNoInputInUse: protectedProcedure
     .input(z.object({init: z.string()}))
          .query(({ ctx, input }) => {
           return ctx.db.sawblades.findMany({
           
            where: {
              AND: [{
             
                deleted: false,
              IdNummer: {startsWith: input.init},
              }]
             
          },
           })
        }),
     getAllNoInputInUseVrak: protectedProcedure
     .input(z.object({init: z.string()}))
          .query(({ ctx, input }) => {
           return ctx.db.sawblades.findMany({
           
            where: {
              AND: [{
             
                deleted: false,
              IdNummer: {startsWith: input.init},
              }]
              
          },
           })
        }),
        countSawblades: protectedProcedure.query(async ({ ctx }) => {
          const count = await ctx.db.sawblades.groupBy({
       by : ['type', 'side', 'deleted'],
       _count:  true,
          });
        
          return count;
        }),



        countSawbladesCustomer: protectedProcedure
        .input(z.object({init: z.string()}))
        .query(async ({ ctx, input }) => {
          const countCustomer = await ctx.db.sawblades.groupBy({
            by: ['type', 'side', 'deleted'],
            _count: true,
            where: {
              IdNummer: {
                startsWith: input.init
              }
            }
          });
      
          return countCustomer;
        }),
        // countSawblades: protectedProcedure.query(async ({ ctx }) => {
        //   const count = await ctx.db.sawblades.count({
        //     where: {
        //      deleted: true
        //     },
        //   });
        
        //   return count;
        // }),

        // countSawblades: protectedProcedure.query(async ({ ctx }) => {
        //   const result = await ctx.db.sawblades.aggregate({
        //     _count: {
        //       _all: true,
        //     },
        //     where: {
        //       deleted: true,
        //     },
        //   });
        
        //   return result;
        // }),
})


 


