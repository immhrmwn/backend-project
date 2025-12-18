import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTaskService } from "../src/taskService";

function createMockStore(initialTasks = []) {
  let data = [...initialTasks];

  return {
    readTask: () => data,
    writeTask: (newData) => {
      data = newData;
    },
  };
}

describe("taskService.addTask", () => {
  // ✅
  it("should add new task", () => {
    const store = createMockStore([]);
    const service = createTaskService(store);

    const task = service.addTask("Belajar unit test");

    expect(task.description).toBe("Belajar unit test");
    expect(task.status).toBe("todo");
    expect(store.readTask().length).toBe(1);
  });

  // ❌
  it("should throw error when description missing", () => {
    const store = createMockStore([]);
    const service = createTaskService(store);

    expect(() => service.addTask()).toThrow("DESCRIPTION_REQUIRED");
  });
});


describe("taskService.deleteTask", () => {
  let store;
  let service;

  beforeEach(() => {
    store = createMockStore([
      {
        "id": 2,
        "description": "Test 3",
        "status": "done",
        "createdAt": "2025-12-18T02:55:17.016Z",
        "updatedAt": "2025-12-18T06:45:09.139Z"
      },
    ]);

    service = createTaskService(store);
  });

  // ✅
  it("should delete task by id", async () => {
    await expect(service.deleteTask(2))
      .resolves
      .toBeUndefined();

    expect(store.readTask()).toHaveLength(0);
  });

  // ❌
  it("should throw error when task not found", async () => {
    await expect(service.deleteTask(99))
      .rejects
      .toThrow("TASK_NOT_FOUND");
  });

  // ❌
  it("should throw error when id is missing", async () => {
    await expect(service.deleteTask())
      .rejects
      .toThrow("ID_REQUIRED");
  });

  // ❌
  it("should throw error when id is invalid", async () => {
    await expect(service.deleteTask('abc'))
      .rejects
      .toThrow("INVALID_ID");
  });
});

describe("taskService.updateTask", () => {
  let store;
  let service;

  beforeEach(() => {
    store = createMockStore([
      {
        "id": 2,
        "description": "Test 3",
        "status": "todo",
        "createdAt": "2025-12-18T02:55:17.016Z",
        "updatedAt": "2025-12-18T06:45:09.139Z"
      },
    ]);

    service = createTaskService(store);
  });

  // ✅
  it("should update task description", () => {
    const before = store.readTask()[0].updatedAt;
    service.updateTask("Test 4", 2);

    const task = store.readTask()[0];

    expect(task.description).toBe("Test 4");
    expect(task.updatedAt).toBeDefined();
    expect(task.updatedAt).not.toBe(before);
  });

  // ❌
  it("should throw error when id is missing", () => {
    expect(() => service.updateStatus("done")).toThrow("ID_REQUIRED");
  });

  // ❌
  it("should throw error when id is invalid", () => {
    expect(() => service.updateStatus("done", 'abc')).toThrow("INVALID_ID");
  });

  // ❌
  it("should throw error when task not found", () => {
    expect(() => service.updateStatus("done", 99)).toThrow("TASK_NOT_FOUND");
  });
});

describe("taskService.updateStatus", () => {
  let store;
  let service;

  beforeEach(() => {
    store = createMockStore([
      {
        "id": 2,
        "description": "Test 3",
        "status": "todo",
        "createdAt": "2025-12-18T02:55:17.016Z",
        "updatedAt": "2025-12-18T06:45:09.139Z"
      },
    ]);

    service = createTaskService(store);
  });

  // ✅
  it("should update task status (done)", () => {
    service.updateStatus("done", 2);

    const task = store.readTask()[0];

    expect(task.status).toBe("done");
    expect(task.updatedAt).toBeDefined();
  });

  // ✅
  it("should update task status (in-progress)", () => {
    service.updateStatus("in-progress", 2);

    const task = store.readTask()[0];

    expect(task.status).toBe("in-progress");
    expect(task.updatedAt).toBeDefined();
  });

  // ✅
  it("should update updatedAt when status is updated", () => {
    const before = store.readTask()[0].updatedAt;

    service.updateStatus("done", 2);

    const after = store.readTask()[0].updatedAt;

    expect(after).toBeDefined();
    expect(after).not.toBe(before);
  });

  // ❌
  it("should throw error when id is missing", () => {
    expect(() => service.updateStatus("done")).toThrow("ID_REQUIRED");
  });

  // ❌
  it("should throw error when id is invalid", () => {
    expect(() => service.updateStatus("done", 'abc')).toThrow("INVALID_ID");
  });

  // ❌
  it("should throw error when task not found", () => {
    expect(() => service.updateStatus("done", 99)).toThrow("TASK_NOT_FOUND");
  });
})