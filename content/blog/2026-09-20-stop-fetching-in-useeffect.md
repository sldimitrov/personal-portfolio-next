---
excerpt: The problems with fetching data in useEffect, and how TanStack Query fixes them with less code.
---

# Why I Stopped Fetching Data in useEffect

## When do we use `useEffect`?

`useEffect` is a React Hook that lets you synchronize a component with an external system.

```tsx
useEffect(setup, dependencies?)
```

Fetching data feels like a natural fit, so that's what most of us use it for. Let's look at what that looks like in practice.

## The classic `useEffect` fetch

```tsx
function User({ id }: { id: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(setUser)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <h1>{user?.name}</h1>;
}
```

It works, but notice we already had to create three pieces of state (`user`, `loading`, `error`) just to display the data safely.

## So what's the problem?

- **Manual loading and error state.** You rewrite this boilerplate in every component that fetches.
- **No caching.** Leave the page and come back, and it fetches again. Two components needing the same data send two duplicate requests.
- **Race conditions.** If `id` changes quickly, an older request can resolve after a newer one, so the UI shows stale data.
- **Request waterfalls.** A child's fetch only starts after the parent renders and finishes its own fetch, so requests run one after another instead of in parallel.

## Fixing the race condition by hand

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    signal: controller.signal,
  })
    .then((res) => res.json())
    .then(setUser)
    .catch((e) => {
      if (e.name !== "AbortError") setError(e.message);
    });

  return () => controller.abort();
}, [id]);
```

This is correct, but it's even more boilerplate, and we still have no caching or deduplication.

## Enter TanStack Query

TanStack Query (formerly React Query) makes fetching, caching, synchronizing and updating server state in your web application a breeze.

Setup, once:

```tsx
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

The same component:

```tsx
function User({ id }: { id: number }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!res.ok) throw new Error("Request failed");
      return res.json() as Promise<User>;
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return <h1>{data.name}</h1>;
}
```

The `queryKey` includes `id`, so each user is cached separately, stale responses are ignored, and two components using `["user", 1]` share a single request.

## What you get for free

- Caching
- Request deduplication
- Automatic retries
- Refetch on window focus
- Background updates
- Built-in loading and error states

## When `useEffect` is still fine

For a tiny app with a single one-off fetch, `useEffect` with proper cleanup is perfectly fine. The pain grows with the number of components sharing server data, and that's when TanStack Query pays off.

## Conclusion

`useEffect` is for synchronizing with external systems. Server data is really cached state that lives on the server, and a library built for that job removes most of the code (and bugs) we used to write by hand.
