import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
  "Buy biscuits",
];

const TODO_ITEMS_TEST = ["Get dinner fixings", "Cook dinner", "Eat dinner"];

test.describe("New Todo", () => {
  test("should have the header of 'Todo List'", async ({ page }) => {
    await expect(page.locator(".chakra-heading")).toHaveText(/Todo List/);
    await expect(page.getByText("Todo List")).toHaveText("Todo List");
  });

  // test("should allow me to add todo items", async ({ page }) => {
  //   // create a new todo locator
  //   const newTodo = page.getByPlaceholder("New todo");
  //   await newTodo.fill(TODO_ITEMS[0]);
  //   await newTodo.press("Enter");

  //   // Make sure the list only has one todo item.
  //   await expect(page.getByTestId("todo-title")).toHaveText([TODO_ITEMS[0]]);
  // });

  test("should fetch initial list of todo items when clicking 'Get todos' button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Get todos" }).click();
    await expect(page.locator(".todo-item-input-hidden")).toHaveText(
      TODO_ITEMS_TEST
    );
    // Another way to have same result as above
    await expect(page.getByTestId("todo-item")).toHaveText(TODO_ITEMS_TEST);
  });

  test("should allow me to add todo items", async ({ page }) => {
    const newTodo = page.getByPlaceholder("New todo");
    await newTodo.click();
    await newTodo.fill("Buy biscuits");
    await page.getByRole("button", { name: "Add Todo" }).click();
    await expect(page.locator(".todo-list > div.todo-item")).toHaveCount(4);
    await expect(page.locator(".todo-item-input-hidden")).toHaveText([
      ...TODO_ITEMS_TEST,
      "Buy biscuits",
    ]);
  });

  test("should allow me to delete todo items", async ({ page }) => {
    await page
      .getByRole("button", { name: 'Delete "Eat dinner" todo' })
      .click();
    await expect(page.locator(".todo-list > div.todo-item")).toHaveCount(2);
    await expect(page.locator(".todo-item-input-hidden")).toHaveText([
      ...TODO_ITEMS_TEST.filter((item) => item !== "Eat dinner"),
    ]);
  });

  test("should allow me to delete all todo items with 'Delete all' button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Delete all" }).click();
    await expect(page.locator(".todo-list > div.todo-item")).toHaveCount(0);
  });

  test("should allow me to mark todo item as done when clicking checkbox", async ({
    page,
  }) => {
    await page
      .getByTestId("todo-list")
      .locator("div")
      .filter({ hasText: "Get dinner fixingsIs done: No" })
      .getByTestId("todo-checkbox")
      .locator("span")
      .click();
    await expect(
      page.locator(".todo-list > div.todo-item:nth-child(1)")
    ).toHaveText("Get dinner fixingsIs done: Yes");
    await expect(
      page
        .locator(".chakra-checkbox")
        .locator("input[value='Get dinner fixings']")
    ).toBeChecked();
  });

  test("should mark all todo items when clicking 'All done' button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "All done" }).click();

    for (const item of TODO_ITEMS_TEST) {
      const isChecked = page
        .locator(".chakra-checkbox")
        .locator(`"input[value=${item}]"`);
      expect(isChecked).toBeTruthy();
    }
  });
});
