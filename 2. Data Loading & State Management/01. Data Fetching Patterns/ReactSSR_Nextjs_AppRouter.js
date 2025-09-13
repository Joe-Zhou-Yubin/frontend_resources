// app/products/page.tsx  (Server Component)
export default async function ProductsPage() {
  // Choose caching policy per route/data
  const res = await fetch("https://api.example.com/products", {
    // cache strategies:
    // cache: 'no-store',                     // always fresh (dynamic SSR)
    // next: { revalidate: 60 },              // ISR-style freshness (60s)
  });
  if (!res.ok) throw new Error("Failed to fetch");
  const products = await res.json();

  // This HTML is rendered on the server and can stream to the client.
  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((p: any) => <li key={p.id}>{p.name}</li>)}
      </ul>
    </main>
  );
}
