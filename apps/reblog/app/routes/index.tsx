import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  const { data } = await fetch(
    "https://04imn06s.api.sanity.io/v1/graphql/production/default",
    {
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
  ).then((res) => res.json());
  return data;
};

export default function Index() {
  const articleDate = useLoaderData();
  return (
    <div>
      <h1>Products</h1>
      {articleDate?.allPost.map((article) => (
        <div key={article._id}>{article.title}</div>
      ))}
    </div>
  );
}
