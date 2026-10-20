import { env, SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { addTask, getTask } from "../src/endpoints/tasks/storage";
import { Task } from "../src/types";

// Helper function to create a task
async function createTask(taskData: Omit<Task, "id">): Promise<Task> {
	const id = await addTask(env, { ...taskData, id: -1 }); // Use a placeholder ID; the actual ID will be assigned in addTask
	return { ...taskData, id };
}

describe("Task API Integration Tests", () => {
	beforeEach(async () => {
		// This is a good place to clear any test data if your test runner doesn't do it automatically.
		// Since the prompt mentions rows are deleted after each test, we can rely on that.
		vi.clearAllMocks();
	});

	// Tests for GET /tasks
	describe("GET /tasks", () => {
		it("should get an empty list of tasks", async () => {
			const response = await SELF.fetch(`http://local.test/tasks`);
			const body = await response.json<{ success: boolean; result: any[] }>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result).toEqual([]);
		});

		it("should get a list with one task", async () => {
			await createTask({
				name: "Test Task",
				description: "A task for testing",
				completed: false,
				due_date: "2030-12-31T23:59:59.000Z",
			});

			const response = await SELF.fetch(`http://local.test/tasks`);
			const body = await response.json<{ success: boolean; result: any[] }>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result.length).toBe(1);
			expect(body.result[0]).toEqual(
				expect.objectContaining({
					name: "Test Task"
				}),
			);
		});
	});

	// Tests for POST /tasks
	describe("POST /tasks", () => {
		it("should create a new task successfully", async () => {
			const taskData = {
				name: "New Task",
				description: "A brand new task",
				completed: false,
				due_date: "2026-12-31T23:59:59.000Z",
			};
			const response = await SELF.fetch(`http://local.test/tasks`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(taskData),
			});

			const body = await response.json<{ success: boolean; result: any }>();

			expect(response.status).toBe(201);
			expect(body.success).toBe(true);
			expect(body.result).toEqual(
				expect.objectContaining({
					id: expect.any(Number),
					...taskData,
				}),
			);
		});

		it("should return a 400 error for invalid input", async () => {
			const invalidTaskData = {
				// Missing required fields 'name', etc.
				description: "This is an invalid task",
			};
			const response = await SELF.fetch(`http://local.test/tasks`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(invalidTaskData),
			});
			const body = await response.json();

			expect(response.status).toBe(400);
			expect(body.success).toBe(false);
			expect(body.errors).toBeInstanceOf(Array);
		});
	});

	// Tests for GET /tasks/{id}
	describe("GET /tasks/{id}", () => {
		it("should get a single task by its ID", async () => {
			const task = await createTask({
				name: "Specific Task",
				description: "A task to be fetched by ID",
				completed: false,
				due_date: "2030-12-31T23:59:59.000Z"
			});

			const response = await SELF.fetch(`http://local.test/tasks/${task.id}`);
			const body = await response.json<{ success: boolean; result: any }>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result).toEqual(
				expect.objectContaining(task),
			);
		});

		it("should return a 404 error if task is not found", async () => {
			const nonExistentId = 9999;
			const response = await SELF.fetch(
				`http://local.test/tasks/${nonExistentId}`,
			);
			const body = await response.json();

			expect(response.status).toBe(404);
			expect(body.success).toBe(false);
		});
	});

	// Tests for PUT /tasks/{id}
	describe("PUT /tasks/{id}", () => {
		it("should update a task successfully", async () => {
			const task = await createTask({
				name: "Updated Task",
				description: "This task has been updated",
				due_date: "2030-12-31T23:59:59.000Z",
				completed: false
			});

			const updatedData = {
				...task,
				completed: true
			};

			const response = await SELF.fetch(`http://local.test/tasks/${task.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedData),
			});
			const body = await response.json<{ success: boolean; result: any }>();

			expect(response.status).toBe(200);
			expect(body.success).toBe(true);
			expect(body.result).toEqual(
				expect.objectContaining({
					...updatedData,
				}),
			);
		});

		it("should return 404 when trying to update a non-existent task", async () => {
			const nonExistentId = 9999;
			const updatedData = {
				name: "Updated Task",
				description: "This task has been updated",
				completed: true,
				due_date: "2025-07-15T10:00:00.000Z",
			};
			const response = await SELF.fetch(
				`http://local.test/tasks/${nonExistentId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedData),
				},
			);

			expect(response.status).toBe(404);
		});

		it("should return 400 for invalid update data", async () => {
			const taskId = await createTask({
				name: "Task",
				description: "...",
				due_date: "2030-12-31T23:59:59.000Z",
				completed: false
			});
			const invalidUpdateData = { name: "" }; // Invalid name
			const response = await SELF.fetch(`http://local.test/tasks/${taskId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(invalidUpdateData),
			});

			expect(response.status).toBe(400);
		});
	});

	// Tests for DELETE /tasks/{id}
	describe("DELETE /tasks/{id}", () => {
		it("should delete a task successfully", async () => {
			const taskData = {
				name: "Task to Delete",
				description: "This task will be deleted",
				completed: false,
				due_date: "2026-08-01T00:00:00.000Z",
			};
			const task = await createTask(taskData);

			const deleteResponse = await SELF.fetch(
				`http://local.test/tasks/${task.id}`,
				{
					method: "DELETE",
				},
			);
			const deleteBody = await deleteResponse.json<{
				success: boolean;
				result: any;
			}>();

			expect(deleteResponse.status).toBe(200);
			expect(deleteBody.success).toBe(true);
			expect(deleteBody.result.id).toBe(task.id);

			// Verify the task is actually deleted
			const shouldBeDeleted = await getTask(env, task.id);
			expect(shouldBeDeleted).toBeUndefined();
		});

		it("should return 404 when trying to delete a non-existent task", async () => {
			const nonExistentId = 9999;
			const response = await SELF.fetch(
				`http://local.test/tasks/${nonExistentId}`,
				{
					method: "DELETE",
				},
			);
			const body = await response.json();

			expect(response.status).toBe(404);
			expect(body.success).toBe(false);
		});
	});
});
