# Task REST API - Student Assignment

project/
├── src/
│   ├── index.ts
│   └── routes/
│       └── createUser.ts
├── package.json
└── tsconfig.json


![OpenAPI Template Preview](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/91076b39-1f5b-46f6-7f14-536a6f183000/public)

<!-- dash-content-start -->

This is a student assignment project built with Cloudflare Workers, featuring a **Task Management REST API** with OpenAPI 3.1 Auto Generation and Validation using [chanfana](https://github.com/cloudflare/chanfana) and [Hono](https://github.com/honojs/hono).

Your assignment is to implement the API endpoint functions that respond to requests for managing tasks. The OpenAPI schema is automatically generated from your code, and all incoming requests are validated against the defined parameters and request body schemas. You can test your implementations directly using the OpenAPI interactive documentation.

This project includes example endpoint structures and integration tests using [Vitest](https://vitest.dev/) to guide your implementation. Your task is to complete the endpoint handlers in `src/endpoints/tasks/` to create, read, update, and delete tasks while adhering to the OpenAPI schema. Data is stored in memory for this assignment.

You can view the generated OpenAPI schema in your browser at `/openapi.json`, or extract it locally by running `npm run schema`.

<!-- dash-content-end -->

## Getting Started

Outside of this repo, you can start a new project with this template using [C3](https://developers.cloudflare.com/pages/get-started/c3/) (the `create-cloudflare` CLI):

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/openapi-template
```

A live public deployment of this template is available at [https://openapi-template.templates.workers.dev](https://openapi-template.templates.workers.dev)

## Setup Steps

1. Install the project dependencies with a package manager of your choice:
   ```bash
   npm install
   ```

2. Deploy the project!
   ```bash
   npm run deploy
   ```

3. Monitor your worker
   ```bash
   npm run tail
   ```

## Assignment: Implement Task API Endpoints

Complete the following endpoint functions in `src/endpoints/tasks/`:
- `taskList()` - List all tasks
- `taskCreate()` - Create a new task
- `taskRead()` - Get a single task by ID
- `taskUpdate()` - Update a task
- `taskDelete()` - Delete a task

Each function must validate requests against the OpenAPI schema defined in `src/endpoints/tasks/base.ts`. Data persists in memory during the worker session.

## Testing

This template includes integration tests using [Vitest](https://vitest.dev/). To run the tests and verify your implementations:

```bash
npm run test
```

Test files are located in the `tests/` directory. Use these as a guide to ensure your endpoint implementations work correctly.

## Project Structure

1. Your main router is defined in `src/index.ts`.
2. Task endpoint implementations belong in `src/endpoints/tasks/`.
3. Task schema definitions are in `src/endpoints/tasks/base.ts`.
4. Integration tests are located in the `tests/` directory.
5. For more information read the [chanfana documentation](https://chanfana.com/), [Hono documentation](https://hono.dev/docs), and [Vitest documentation](https://vitest.dev/guide/).


Here we used template
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/chanfana-openapi-template)