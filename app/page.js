"use client"

import { InstagramEmbed, LinkedInEmbed, TwitterEmbed } from 'react-social-media-embed';
import posts from './posts.json';
import { useEffect, useState } from 'react';

const BREAKPOINTS = {
  SMALL: 768,
  MEDIUM: 1024,
  LARGE: 1280
};

export default function Home() {
  const [numColumns, setNumColumns] = useState(3);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.SMALL) {
        setNumColumns(1);
      } else if (width < BREAKPOINTS.MEDIUM) {
        setNumColumns(2);
      } else {
        setNumColumns(3);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const postsWithId = posts.map((post, index) => {
    return {
      ...post,
      id: index + 1
    };
  });

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center'>
      {postsWithId.map((post) => {
        let EmbedComponent;

        switch (post.Platform) {
          case 'Instagram':
            EmbedComponent = InstagramEmbed;
            break;
          case 'Linkedin':
            EmbedComponent = LinkedInEmbed;
            break;
          case 'Twitter':
            EmbedComponent = TwitterEmbed;
            break;
          default:
            EmbedComponent = null;
        }

        return (
          <div key={post.id} className='flex justify-center'>
            {EmbedComponent && <EmbedComponent key={post.id} url={post.Link} className='w-80' />}
          </div>
        );
      })}
    </div>
  );
}