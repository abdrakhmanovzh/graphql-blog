import { gql, request } from "graphql-request";

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query Assets {
            posts {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                    createdAt
                }
                slug
                title
                excerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
            }
        }
    `;
    const res = await request(graphqlApi, query);

    return res.posts;
};
