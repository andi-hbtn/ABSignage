# Faqja zyrtare e ABSignage — imazh i vetëmjaftueshëm për Easypanel/Contabo.
#
# Next.js me `output: "standalone"`: `next build` nxjerr një server Node me vetëm
# varësitë që përdoren. Imazhi përfundimtar nuk ka as `npm`, as kodin burim, as
# varësitë e zhvillimit.
#
# Faqja NUK është statike: `src/app/api/send-demo/route.ts` përpunon kërkesat e
# provës 14-ditore në server. Prandaj duhet një server Node, jo nginx me skedarë.

FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Serveri i Next-it dëgjon te `localhost` nëse s'i thuhet ndryshe, dhe atëherë
# platforma nuk e arrin dot nga jashtë kontejnerit.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Jo si root: një proces i kompromentuar nuk duhet të jetë administrator i kontejnerit.
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# `standalone` nuk i përfshin këto të dyja — duhen kopjuar veç, përndryshe faqja
# ngarkohet pa CSS, pa JS dhe pa imazhe.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
