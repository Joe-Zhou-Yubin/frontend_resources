// pages/products.tsx
export default function Products({ products }: { products: any[] }) {
  // HTML rendered on server; hydration attaches events on client.
  return (
    <>
      <h1>Products</h1>
      <ul>
        {products.map((p) => <li key={p.id}>{p.name}</li>)}
      </ul>
    </>
  );
}

// Runs per-request on the server
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();
  return { props: { products } };
}
