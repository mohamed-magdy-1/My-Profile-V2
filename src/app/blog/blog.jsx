'use client'

import React, { useEffect, useState} from "react";
import GlobalApi from "../_utils/GlobalApi";
import "./blog.css";
import Link from "next/link";
import Image from "next/image";
import { PiPlusBold } from "react-icons/pi";

import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
const LordIconDocument = dynamic(() => import('../components/LordIcon/LordIcon').then((mod) => mod.LordIconDocument), { ssr: false });
const LordIconGlobe = dynamic(() => import('../components/LordIcon/LordIcon').then((mod) => mod.LordIconGlobe), { ssr: false });


const Blog = () => {


  const [data, setData] = useState(null);


  useEffect(() => {
    async function BlogFunApi() {
      try {
        let res = await GlobalApi.BlogApi();
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    BlogFunApi();
  }, []);



  
  return (
    <>
      <Link href={'/blog/allBlogs'} className='more'>
        <div className='plus'>
          <PiPlusBold />
        </div>
        <div className='content-more'>more blogs</div>
      </Link>
      
      <div className="allBlog">
        {data && data.length > 0 ? (
          data.map((item) => (
            <Link key={item.id} className="blog-card" href={`/blog/${item?.slug}`}>
              <div className="blog-img">
                {item?.cover[0]?.url && (
                  <Image
                    className="img-1"
                    src={item?.cover[0]?.url}
                    alt="Background Image"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="blog-content">
                <h4 className="blog-date">{item?.project?.old_date}
                  <span className="line-2"></span>
                </h4>
                <div className='icons'>
                  {item?.project?.wap && (
                  <LordIconGlobe/>
                  )}
                    <LordIconDocument />
                </div>
                <h1 className="blog-title">{item?.title}</h1>
                <p className="blog-des" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.project?.des) }}></p>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Blog;
