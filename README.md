# Voyger : Tour website
- layout of the App
Header







1. pinterest - HD photo
2. make responsive, drop search suggestions 

# implement JSON into a frontend project in multiple ways
1. Import Local JSON File (Static Import)

import data from "./data/products.json";
console.log(data);
2. Fetch Local JSON from Public Folder

useEffect(() => {
  fetch("/data/products.json")
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);

3. Fetch JSON from External API
useEffect(() => {
  fetch("https://api.example.com/products")
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);

4. Internal API Route (Next.js Recommended)
// app/api/products/route.ts
import data from "@/data/products.json";

export async function GET() {
  return Response.json(data);
}
fetch("/api/products")
5. Server-Side Rendering (SSR / SSG) - SEO-friendly approach
export async function getStaticProps() {
  const data = await import("../data/products.json");
  return { props: { products: data.default } };
}
6. useEffect + JSON (Manual State Injection)
useEffect(() => {
  const data = {
    name: "Dubai Tour",
    price: 5000
  };

  setTour(data);
}, []);
7. JSON via Axios
import axios from "axios";

useEffect(() => {
  axios.get("/data/products.json")
    .then(res => setProducts(res.data));
}, []);

# 
1. JSON is not the feature. JSON is just a data format.
2. Different projects have different needs: Speed, SEO, Security, scalability, developer experience
3. “There are multiple ways to use JSON in a project—static imports for mock data, public folder fetching for API simulation, internal API routes in Next.js for clean architecture, server-side rendering for SEO, and real APIs or databases for production. The choice depends on performance, scalability, and data update frequency.”
4. “We use multiple ways to implement JSON because data has different lifecycles. Some data is static and best loaded at build time, some is dynamic and fetched at runtime, and some must be rendered on the server for SEO or security. Choosing the right approach improves performance, scalability, and maintainability.”

5. Data lifecycle decides architecture, not preference”. means You do not choose API, JSON import, SSR, useEffect but You choose them because data behaves in a certain way over time.
- A data lifecycle is the journey of data from: Creation → Storage → Delivery → Usage → Update → Deletion 
- Every piece of data in your app follows this journey. Architecture follows data behavior, not developer comfort.
6. Before choosing architecture, ask:
- Who creates this data?
ans: This tells you: Can the client be trusted or not?
```
{
| Creator     | What it implies    | Architecture |
| ----------- | ------------------ | ------------ |
| Developer   | Safe, predictable  | Static JSON  |
| Admin / CMS | Controlled updates | API / SSG    |
| User        | Untrusted input    | Server-only  |
| System      | Needs validation   | Server       |
}
```
- How often does it change?
ans: This decides: Static vs Dynamic loading

- Who consumes it?
ans: This tells you: Client vs Server vs Search Engine
- When is it needed?
ans: This decides: SSR vs Client rendering
```
{
| Time           | Meaning     | Architecture |
| -------------- | ----------- | ------------ |
| Before render  | Critical    | SSR          |
| After render   | Optional    | Client       |
| On interaction | Event-based | useEffect    |
}
```
- What happens if it’s wrong?
ans: This decides: Security & validation

7. “I decide architecture by asking who creates the data, how often it changes, who consumes it, when it’s needed, and the impact if it’s wrong. Those answers automatically tell me whether data should be static, client-fetched, or server-rendered.”
