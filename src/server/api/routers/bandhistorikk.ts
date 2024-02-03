// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
export const bandhistorikkRouter = createTRPCRouter({


    
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

 
})




 

 


