// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = "https://api-ap-south-1.hygraph.com/v2/clcnnb0jm0avz01umdp4c84ad/master";

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers:{
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzM1ODkzNDIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsY25uYjBqbTBhdnowMXVtZHA0Yzg0YWQvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjJhZTYxNGJjLTgyOWItNGJiNy04NWE4LTk0OWMxOGY0MzhmYiIsImp0aSI6ImNsY3UzdnQ1YzB3ZTUwMXVmYThsdDlmdWgifQ.ZaTdxM9bXd3gf5RyW4Zw_MSZWUKSSdYrurYp_ANeyreM0j56gA6gTbkxRvM9Oa3feau9Wq7h5XiaOvx6luHwQ_SUl5hi8f80ttX1xEggWnFLdxF5jM4g8o6D4nY-HDT4Qfwi7MHCD4STlWqhIaD07gvjkJpXWeLL7_tDbVO6JMLzrxkrQrmKFSQALzP20azGX2RnfwICPi35OWr5GgIWhEdKPDHMXOGdgvmF-wGQVnBhXAzvH5Han3yRGSKskWToOJXERo7UPvj9y8jnQWE_XS_h3262Q3MA79PXQjfy4SUMxiLDn38asks24L3lrhT_7j6HbNabwPDc8L7pML-dxTiBY1jam2l9zzq-S-UQFWEd8jp3zqn_S3NDIQyx7jCaBNLG2LphyB4YXGN_j5dgT1EzYEdySagPvTYARpTb0-L0f3UecCHpQtOmnlAiZSqPdxOOMpeeOONHc-evOxR8QEDLod_Wjog_vYBduEMp2FkyHbogz-5He-DT8C_idyfqmwPRnUp_OXTE1J7aB71aJahvisLtAfsr0ICRArYFHAoeUw8BTQvngY-SgETyxYe9DtKdaen74QUT9maFKGkHD1VHL0J20Ug1CAqKc73yQW49yBEwd0q3UJxmE2Jrf8Nx68wtkbysvSIdaxb9U-wTi2vsO7OwoHFY9kINQGRRU5c`
    }
  })

  const query = gql `
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
  }
  `;

  try {
    const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });
     return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
