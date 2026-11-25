export interface CodeHighlight {
  title: string;
  description: string;
  language: string;
  code: string;
}

export interface CaseStudy {
  role: string;
  timeline: string;
  problem: string;
  solution: string[];
  techStack: { category: string; items: string[] }[];
  impact: string[];
  learnings: string[];
  codeHighlights: CodeHighlight[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  caseStudy?: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    id: "finsight",
    name: "FinSight",
    description: "A personal finance tracker built with Django and PostgreSQL",
    longDescription:
      "FinSight brings your accounts, income and expenses into one place. Built as university coursework, it focuses on the parts that matter when money is involved: balances that stay in step with transactions, decimal precision, and strict separation of each user's data.",
    tags: ["Python", "Django", "PostgreSQL", "Django Templates", "ORM"],
    github: "https://github.com/sldimitrov/finsight",
    caseStudy: {
      role: "Solo developer - Django backend, PostgreSQL and server-rendered UI",
      timeline: "November 2026",
      problem:
        "Personal finances tend to be scattered across banking apps, several accounts and cash, which makes it hard to see what is coming in and going out. Built as coursework for a Programming course at Plovdiv University, FinSight puts accounts and transactions in one place. The core engineering requirement: an account balance must stay consistent with the transactions recorded against it, and users must only ever reach their own data.",
      solution: [
        "FinSight is a Django monolith backed by PostgreSQL, with server-rendered templates and responsive CSS instead of a separate frontend. That was a deliberate fit for a planned audience of 20-100 users. The code is split into focused apps for users, accounts and transactions, plus a core app for configuration.",
        "Signed-in users can create, edit and deactivate checking, savings, credit and investment accounts, then record income and expenses against them. Creating or deleting a transaction runs inside an atomic database transaction, so the record and the balance change are saved together or not at all. Money is stored in DecimalField columns to avoid floating-point rounding errors.",
        "History is protected by design. Transactions cannot be edited, only deleted (which reverses their effect on the balance) and re-created. Accounts are deactivated through the app rather than deleted, and PROTECT foreign keys stop Django from deleting an account that still has transactions.",
      ],
      techStack: [
        { category: "Backend", items: ["Python", "Django 6", "Django ORM"] },
        { category: "Database", items: ["PostgreSQL"] },
        { category: "UI", items: ["Django Templates", "Responsive CSS"] },
        { category: "Tooling", items: ["django-environ", "django-debug-toolbar", "Django test framework"] },
      ],
      impact: [
        "Cut the transaction list from 1,003 SQL queries to 4 in a test with 1,000 records, after finding an N+1 problem with Django Debug Toolbar.",
        "Reduced the measured query time in the same test from 389.17 ms to 18.15 ms.",
        "16 automated tests cover form validation, model rules, balance updates and data isolation.",
        "Requests for another user's account or transaction return 404, and the transaction list shows only the signed-in user's records.",
        "A custom seed command generates sample data, so the performance experiment can be repeated.",
      ],
      learnings: [
        "An ORM can hide a lot of database traffic. The list page worked correctly while running an extra query for every row, and it took measuring to see it.",
        "Making transactions immutable keeps the balance logic simple: there are only two cases to handle, create and delete, with no need to calculate the difference after an edit.",
        "An atomic block prevents half-finished writes, but not two requests updating the same balance at once. Locking the account row with select_for_update(), or updating the balance with an F() expression, is the next improvement.",
        "Next on the roadmap: registration, transfers between accounts, categories and a financial overview dashboard.",
      ],
      codeHighlights: [
        {
          title: "Keeping the balance in step with transactions",
          description:
            "The view looks up the account by both ID and owner, so another user's account returns 404. The atomic decorator commits the new transaction and the balance change together, or rolls both back.",
          language: "python",
          code: `@login_required
@transaction.atomic
def create_transaction(request, account_id):
    account = get_object_or_404(Account, id=account_id, user=request.user, is_active=True)
    form = TransactionForm(request.POST if request.method == "POST" else None)
    if request.method == "POST" and form.is_valid():
        transaction = form.save(commit=False)
        transaction.account = account
        transaction.save()

        if transaction.type == "income":
            account.balance += transaction.amount
        elif transaction.type == "expense":
            account.balance -= transaction.amount
        account.save(update_fields=("balance",))

        return redirect("accounts:detail", account_id=account.pk)

    return render(
        request,
        "transactions/transaction_form.html",
        {"form": form, "account": account},
    )`,
        },
        {
          title: "Fixing the N+1 query on the transaction list",
          description:
            "Prefetching the related accounts loads them all in one extra query, instead of one query per row while the template renders. The filter also limits results to the signed-in user.",
          language: "python",
          code: `@login_required
def transaction_list(request):
    transactions = (
        Transaction.objects.filter(account__user=request.user)
        .prefetch_related("account")
        .order_by("-date", "-pk")
    )
    return render(request, "transactions/transaction_list.html", {"transactions": transactions})`,
        },
      ],
    },
  },
  {
    id: "hackfeed",
    name: "HackFeed",
    description: "A tech news aggregation app built with React and Supabase",
    longDescription:
      "HackFeed is a tech news aggregation app that delivers curated content from the developer world through a clean, responsive interface. The project emphasizes real-time data fetching, modular component structure, and modern frontend practices.",
    tags: ["React", "Supabase", "Real-time", "TypeScript", "Tailwind CSS"],
    link: "https://hack-feed-real.vercel.app/",
    github: "https://github.com/sldimitrov/hackfeed",
    caseStudy: {
      role: "Solo developer - frontend and Supabase backend",
      timeline: "June - July 2025",
      problem:
        "Built as a technical assignment: ship a full-stack social feed where users can register, post, like, share, comment and report content, with an admin moderation flow on top. The goal was to show real SQL-backed architecture rather than a UI wired to mock data - a feed that joins posts, profiles, likes and shares, filters by user, and stays snappy as it grows.",
      solution: [
        "Supabase provides the PostgreSQL database, JWT-based auth and file storage, so the frontend talks to real tables instead of a hand-rolled API. Posts, profiles, likes and shares live in separate tables, and a Postgres view (feed_posts_shared) joins them into the exact shape the UI needs - including like counts, whether the current user liked a post, and who shared it.",
        "On the client, every read goes through a custom TanStack Query hook and every write through a mutation that invalidates the relevant cache key. Components stay declarative: they call a hook and render loading, error and data states. The feed uses infinite pagination with a page size of five, so the first paint stays cheap regardless of how many posts exist.",
        "The app is split by responsibility: pages map to routes, hooks own data logic, a services layer wraps every Supabase call, Yup schemas validate forms, and a small Zustand store holds the session. Role-based access separates regular users from admins, who can review reports and delete any post.",
      ],
      techStack: [
        { category: "Frontend", items: ["React 19", "TypeScript", "Vite", "React Router"] },
        { category: "Styling & UI", items: ["Tailwind CSS", "MUI", "Framer Motion"] },
        { category: "Data & State", items: ["TanStack Query", "Zustand", "React Hook Form", "Yup"] },
        { category: "Backend", items: ["Supabase", "PostgreSQL", "Supabase Auth", "Supabase Storage"] },
        { category: "Tooling & i18n", items: ["i18next", "ESLint", "Prettier", "Vercel"] },
      ],
      impact: [
        "Shipped end to end: a public live demo on Vercel and an open-source repository.",
        "Covers the full feed lifecycle - auth, posting, likes, shares, comments, reports, and profile editing with avatar upload or preset avatars.",
        "Admin moderation flow with role-based access: admins can review reported posts and delete any post.",
        "Bilingual interface (English and Bulgarian) using i18next with browser language detection.",
        "Roughly 3,000 lines of TypeScript organised into 11 custom hooks and 8 service modules, keeping UI components thin.",
      ],
      learnings: [
        "Moving joins and aggregates into a Postgres view is far simpler than stitching several queries together on the client - the frontend gets one flat row per feed item.",
        "TanStack Query's cache keys and invalidation make a feed feel live without a socket: after a mutation the affected list refetches. The next step would be Supabase Realtime subscriptions for true push updates.",
        "The comment and share cooldown lives in client state, so it resets on reload and can be bypassed. Real rate limiting belongs in the database (RLS policies or a function), which is the main thing I would change.",
        "Splitting hooks, services and schemas early kept a 3,000-line codebase easy to navigate, and made features like reports and shares cheap to add.",
      ],
      codeHighlights: [
        {
          title: "Infinite pagination with TanStack Query",
          description:
            "The next page offset is derived from how many pages are already loaded, and pagination stops as soon as a page comes back short. Stale and garbage-collection times keep navigation between feed and profile instant.",
          language: "ts",
          code: `export function useInfinitePosts(PAGE_SIZE: number = 5) {
  return useInfiniteQuery<Post[], Error, InfiniteData<Post[]>, string[], number>({
    queryKey: [QUERY_POSTS],
    queryFn: ({ pageParam = 0 }) => PostsService.list(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length * PAGE_SIZE,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}`,
        },
      ],
    },
  },
];

export function getProjectById(id: string) {
  return PROJECTS.find((project) => project.id === id);
}
