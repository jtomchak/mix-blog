require("dotenv").config({ path: "./.env.development" }); //loaded from .env.development
const r2 = require("r2");
const slugify = require("slugify");
var wpArticles = require("./rss-feed.json");

/**
 { 
      "create": { 
        "_id": "123", 
        "_type": "cms.article", 
        "title": "An article" 
      } 
    }
 */
const postTemplate = (p) => ({
  create: {
    body: p.content, // content
    title: p.title, // title
    _type: "post", // don't forget the document type
    publishedAt: new Date(p.pubDate).toISOString(), //pubDate ISO-8601 new Date('XXXX').toISOString()
    author: {
      // get author ref from an existing post and copy it here
      _ref: "fb96e2fc-30aa-4425-a38a-8b0221f717c7",
      _type: "reference",
    },
    slug: {
      current: slugify(p.title, { strict: true }), // slugify(title, {remove: /[*+~.()'"!:@]/g}))
    },
  },
});

const mutations = wpArticles.items.map(postTemplate);

const uploadPosts = async () => {
  try {
    const response = await r2.post(
      `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.SANITY_STUDIO_API_DATASET}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_STUDIO_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      }
    ).json;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

uploadPosts();
