import React from "react";

async function getRecentPosts() {
  const res = await fetch(
    "https://04imn06s.api.sanity.io/v1/graphql/production/default",
    {
      next: { revalidate: 60_000 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
  query LastestArticles {
    allPost(limit: 30, sort:{publishedAt: DESC}) {
      _id
      title
      body
      slug{
        current
      }
      publishedAt
      categories{
        title
      }
    }
}
  `,
      }),
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}

// Default '/' route
export default async function Page() {
  const { data } = await getRecentPosts();
  return (
    <>
      <h1>Hello, there!</h1>
      <ul>
        {data?.allPost.map((p) => (
          <li key={p._id}>{p.title}</li>
        ))}
      </ul>
    </>
  );
}
