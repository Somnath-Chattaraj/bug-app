FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3006

CMD ["bun", "run", "start"]