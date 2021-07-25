FROM public.ecr.aws/lambda/nodejs:14

COPY package.json build/ ./
RUN npm install



