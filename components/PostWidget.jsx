import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '@/services'
import Image from 'next/image'

const PostWidget = ({ categories, slug }) => {

    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        }
    }, [slug])

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className='w-16 flex-none'>
                        <div className='relative w-[60px] h-[60px] align-middle rounded-full'>
                            <Image alt={post.title} fill src={post.featuredImage.url} className="rounded-full" />
                        </div>
                    </div>
                    <div className='flex-grow ml-4'>
                        <p className='text-gray-500 text-xs'>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                        <Link href={`/post/${post.slug}`} className="text-md">{post.title}</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget