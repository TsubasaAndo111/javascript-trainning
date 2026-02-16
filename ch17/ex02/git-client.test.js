const { createIssue, closeIssue, listOpenIssues } = require("./git-client");

global.fetch = jest.fn();

describe("GitHub Client - Jest Mock", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("createIssue calls GitHub API", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 201,
      text: async () =>
        JSON.stringify({ id: 1, number: 123, title: "Test Issue" }),
      headers: { entries: () => [] },
    });

    const data = await createIssue({
      owner: "test",
      repo: "repo",
      token: "dummy",
      title: "Test Issue",
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data.number).toBe(123);
  });

  test("closeIssue sends PATCH", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ id: 1, number: 123, title: "Closed" }),
      headers: { entries: () => [] },
    });

    const data = await closeIssue({
      owner: "test",
      repo: "repo",
      token: "dummy",
      number: 123,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/issues/123"),
      expect.objectContaining({ method: "PATCH" }),
    );
    expect(data.title).toBe("Closed");
  });

  test("listOpenIssues filters PRs", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify([
          { id: 1, number: 1, title: "Issue1" },
          { id: 2, number: 2, title: "PR", pull_request: {} },
        ]),
      headers: { entries: () => [] },
    });

    const data = await listOpenIssues({
      owner: "test",
      repo: "repo",
      token: "dummy",
    });

    expect(data.length).toBe(1);
  });
});
