import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";

export default async function BlogSection() {
  let blogs = [];

  try {
    const response = await apiGet("/blogs?take=3");
    if (response && Array.isArray(response.data)) {
      blogs = response.data;
    } else if (Array.isArray(response)) {
      blogs = response;
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-2">
            Our <span className="text-secondary">Blogs</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Stay updated with the latest news and events at Apex School.
          </p>
        </div>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-52 w-full">
                  {blog.featuredImage?.url ? (
                    <Image
                      src={blog.featuredImage.url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-box">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                    {blog.blogType?.name || "News"}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-box">
                    {blog.summary}
                  </p>
                  <Link
                    href={`/blog`}
                    className="inline-block text-secondary font-medium text-sm  mt-auto"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-secondary/90 text-white font-medium px-6 py-2 text-sm rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}