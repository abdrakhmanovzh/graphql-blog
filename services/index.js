import { gql, request } from "graphql-request";

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query GetPosts {
            posts {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
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

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails {
            posts(orderBy: createdAt_ASC, last: 3) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;
    const res = await request(graphqlApi, query);

    return res.posts;
};

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {
                    slug_not: $slug
                    AND: { categories_some: { slug_in: $categories } }
                }
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;
    const res = await request(graphqlApi, query, { slug, categories });

    return res.posts;
};

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;
    const res = await request(graphqlApi, query);

    return res.categories;
};

export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                title
                excerpt
                featuredImage {
                    url
                }
                author {
                    name
                    bio
                    photo {
                        url
                    }
                }
                createdAt
                slug
                content {
                    raw
                }
                categories {
                    name
                    slug
                }
            }
        }
    `;

    const res = await request(graphqlApi, query, { slug });

    return res.post;
};

export const submitComment = async (obj) => {
    const result = await fetch("/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    });

    return result.json();
};

export const getComments = async (slug) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post: { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `;

    const res = await request(graphqlApi, query, { slug });

    return res.comments;
};

export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            posts(where: { categories_some: { slug: $slug } }) {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
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

    const result = await request(graphqlApi, query, { slug });

    return result.posts;
};
