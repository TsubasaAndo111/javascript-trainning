const USAGE = `
GitHub Issues CLI

使い方:
  node git-issues.js [オプション] <コマンド> [コマンドオプション]

コマンド:
  create   Issue を作成する
  close    指定した Issue をクローズする
  list     オープンな Issue の Id と Title の一覧を表示する

必須オプション:
  --repo <owner/repo>        例: --repo octocat/Hello-World
  (または --owner <owner> と --repoName <repo> の組み合わせ)

共通オプション:
  -v, --verbose               HTTP ログを出力
  -h, --help                  使い方を表示

コマンドオプション:
  create:
    --title, -t <title>
    --body,  -b <text>
    --labels <comma,separated,labels>
  close:
    --number, -n <issue_number>
`;

// Helpを出力
function printHelp() {
  console.log(USAGE.trim());
}

// エラーメッセージを出力してプロセスを終了
function die(msg, code = 1) {
  console.error(`ERROR: ${msg}`);
  process.exit(code);
}

// namesが含まれているかのチェック
function hasFlag(args, ...names) {
  return names.some((n) => args.includes(n));
}

// 指定したフラグ名が含まれている場合、その次の要素を値として返す
// フラグの値を返す関数
function getOpt(args, name) {
  const i = args.indexOf(name);
  if (i !== -1 && i + 1 < args.length) return args[i + 1];
  return undefined;
}

// コマンドライン引数の中から、最初に現れる「ハイフンで始まらないトークン」を取り出す
// create, close, listのいずれかが取り出される
function getCommand(args) {
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!a.startsWith("-")) return a;
    // 値を伴うオプションは 1 トークン進める（-v/-h はスキップ不要）
    const needsValue = new Set([
      "--repo",
      "--owner",
      "--repoName",
      "--title",
      "-t",
      "--body",
      "-b",
      "--labels",
      "--assignees",
      "--milestone",
      "--number",
      "-n",
    ]);
    if (needsValue.has(a)) i++;
  }
  return null;
}

// HTTPログ出力時にトークンをマスクする関数
function sanitizeHeadersForLog(h) {
  const copy = { ...h };
  if (copy["Authorization"])
    copy["Authorization"] = copy["Authorization"].replace(
      /Bearer\s+.*/,
      "Bearer ***"
    );
  return copy;
}

// GitHubのREST API呼出し用
async function ghRequest({ method, path, token, body, verbose }) {
  const url = `https://api.github.com${path}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "git-issues-cli",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(body ? { "Content-Type": "application/json" } : {}),
  };

  // リクエスト情報のHTTPログ出力
  if (verbose) {
    const logHeaders = sanitizeHeadersForLog(headers);
    console.error(`-> ${method} ${url}`);
    console.error(`   headers: ${JSON.stringify(logHeaders)}`);
    if (body) console.error(`   body: ${JSON.stringify(body)}`);
  }

  // API呼出し
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();

  // レスポンス情報のHTTPログ出力
  if (verbose) {
    console.error(`<-${res.status} ${res.statusText}`);
    // レスポンスボディは長い場合があるため、最初の 1KB をログ
    const preview =
      text.length > 1024 ? text.slice(0, 1024) + "...(+truncated)" : text;
    console.error(`   response: ${preview}`);
  }

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  // レスポンスヘッダーの取得・正規化
  const headersObj = {};
  for (const [k, v] of res.headers.entries()) headersObj[k.toLowerCase()] = v;

  return { data, headers: headersObj, status: res.status };
}

// issue作成
// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
async function createIssue({
  owner,
  repo,
  token,
  verbose,
  title,
  body,
  labels,
}) {
  if (!title) die("create: --title (-t) は必須です");
  const payload = { title };
  if (body) payload.body = body;
  if (labels && labels.length) payload.labels = labels;

  const { data } = await ghRequest({
    method: "POST",
    path: `/repos/${owner}/${repo}/issues`,
    token,
    body: payload,
    verbose,
  });

  console.log(`Created: #${data.number} | id=${data.id} | ${data.title}`);
  console.log(`URL: ${data.html_url}`);
}

// issueクローズ
// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#update-an-issue
async function closeIssue({ owner, repo, token, verbose, number }) {
  if (!number || isNaN(Number(number)))
    die("close: --number (-n) に有効な Issue 番号を指定してください");
  const { data } = await ghRequest({
    method: "PATCH",
    path: `/repos/${owner}/${repo}/issues/${number}`,
    token,
    body: { state: "closed" },
    verbose,
  });
  console.log(`Closed: #${data.number} | id=${data.id} | ${data.title}`);
}

// Open Issueのリスト
// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
async function listOpenIssues({ owner, repo, token, verbose }) {
  let page = 1;
  const perPage = 100;
  const rows = [];

  // ページが複数あるときは何度かAPI呼出しする
  while (true) {
    const { data, headers } = await ghRequest({
      method: "GET",
      path: `/repos/${owner}/${repo}/issues?state=open&per_page=${perPage}&page=${page}`,
      token,
      verbose,
    });

    // PR を除外（issues API に PR が混ざるため）
    const onlyIssues = (data || []).filter((x) => !x.pull_request);
    for (const it of onlyIssues) {
      rows.push({ id: it.id, number: it.number, title: it.title });
    }

    // 次のページがあるかどうか確認
    const link = headers["link"] || "";
    const hasNext = /rel="next"/.test(link);
    if (!hasNext) break;
    page++;
  }

  if (rows.length === 0) {
    console.log("No open issues.");
    return;
  }

  console.log("Open Issues (Id\\tTitle):");
  for (const r of rows) {
    console.log(`${r.id}\t${r.title}  /* #${r.number} */`);
  }
}

(async function main() {
  const args = process.argv.slice(2);

  // 引数を指定できていない場合と-h,--helpの場合は使い方を出力
  if (args.length === 0 || hasFlag(args, "-h", "--help")) {
    printHelp();
    return;
  }

  // 引数に-v,--verboseがある場合、フラグを立てる
  // verboseがtrueのとき、HTTPログを出力
  const verbose = hasFlag(args, "-v", "--verbose");

  // 環境変数からトークンを取得
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    die(
      "環境変数 GITHUB_TOKEN に GitHub PAT を設定してください（scope: repo）"
    );
  }

  // repo 指定の取り扱い
  let owner, repo;
  const repoStr = getOpt(args, "--repo");
  if (repoStr) {
    const parts = repoStr.split("/");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      die('--repo は "owner/repo" 形式で指定してください');
    }
    [owner, repo] = parts;
  } else {
    owner = getOpt(args, "--owner");
    repo = getOpt(args, "--repoName");
    if (!owner || !repo) {
      die(
        "リポジトリは --repo <owner/repo> で指定するか、--owner と --repoName を併用してください"
      );
    }
  }

  // コマンドの取得
  const cmd = getCommand(args);
  if (!cmd) die("コマンドが指定されていません（create | close | list）");

  try {
    switch (cmd) {
      case "create": {
        const title = getOpt(args, "--title") || getOpt(args, "-t");
        const body = getOpt(args, "--body") || getOpt(args, "-b");
        const labelsStr = getOpt(args, "--labels");
        const labels = labelsStr
          ? labelsStr
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean) // falsyな値（空文字）を削除
          : undefined;
        await createIssue({ owner, repo, token, verbose, title, body, labels });
        break;
      }
      case "close": {
        const number = getOpt(args, "--number") || getOpt(args, "-n");
        await closeIssue({ owner, repo, token, verbose, number });
        break;
      }
      case "list": {
        await listOpenIssues({ owner, repo, token, verbose });
        break;
      }
      default:
        die(`未知のコマンド: ${cmd}`);
    }
  } catch (err) {
    die(err.message);
  }
})();
