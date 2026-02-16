/*
 * CLI部分を削除して、API呼出し部分だけを残した
 * Issueの各操作関数についてはCLI向けの出力を除いてシンプルなものとした
 */

function sanitizeHeadersForLog(h) {
  const copy = { ...h };
  if (copy["Authorization"]) {
    copy["Authorization"] = copy["Authorization"].replace(
      /Bearer\s+.*/,
      "Bearer ***",
    );
  }
  return copy;
}

async function ghRequest({ method, path, token, body, verbose }) {
  const url = `https://api.github.com${path}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "git-issues-cli",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(body ? { "Content-Type": "application/json" } : {}),
  };

  if (verbose) {
    console.error(`-> ${method} ${url}`);
    console.error(
      `   headers: ${JSON.stringify(sanitizeHeadersForLog(headers))}`,
    );
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }

  const data = text ? JSON.parse(text) : null;

  const headersObj = {};
  for (const [k, v] of res.headers.entries()) {
    headersObj[k.toLowerCase()] = v;
  }

  return { data, headers: headersObj, status: res.status };
}

async function createIssue({
  owner,
  repo,
  token,
  verbose,
  title,
  body,
  labels,
}) {
  if (!title) throw new Error("title is required");

  const payload = { title };
  if (body) payload.body = body;
  if (labels) payload.labels = labels;

  const { data } = await ghRequest({
    method: "POST",
    path: `/repos/${owner}/${repo}/issues`,
    token,
    body: payload,
    verbose,
  });

  return data;
}

async function closeIssue({ owner, repo, token, verbose, number }) {
  if (!number) throw new Error("number is required");

  const { data } = await ghRequest({
    method: "PATCH",
    path: `/repos/${owner}/${repo}/issues/${number}`,
    token,
    body: { state: "closed" },
    verbose,
  });

  return data;
}

async function listOpenIssues({ owner, repo, token, verbose }) {
  const { data } = await ghRequest({
    method: "GET",
    path: `/repos/${owner}/${repo}/issues?state=open`,
    token,
    verbose,
  });

  return data.filter((x) => !x.pull_request);
}

module.exports = {
  ghRequest,
  createIssue,
  closeIssue,
  listOpenIssues,
};
