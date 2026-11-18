import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;

  let blog = null;

  try {
    const response = await apiGet(`/blogs/${slug}`);

    if (response && response.id && response.title) {
      blog = response;
    } else if (response && response.data && response.data.id) {
      blog = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch blog:", error.message);
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Full Cover Image at the Top */}
      {blog.coverImage?.url && (
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src={blog.coverImage.url}
            alt={blog.title}
            fill
            className="object-full object-cover"
            unoptimized
            priority
          />
          {/* Optional dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Content Below the Image */}
      <div className="w-11/13 mx-auto py-12">
      <div className="mb-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#FF4B4B] font-medium "
          >
            ← Back to Blogs
          </Link>
        </div>
        <span className="inline-block bg-secondary text-white text-xs font-semibold px-3 py-2 rounded-full mb-4">
          {blog.blogType?.name || "News"}
        </span>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Author & Date */}
        <div className="text-gray-500 text-sm flex items-center gap-4 mb-8 pb-6 border-b border-gray-300">
          <span>By {blog.author || "Admin"}</span>
          <span>•</span>
          <span>
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </span>
        </div>

        {/* Summary */}
        {blog.summary && (
          <div className="bg-gray-50 border-l-4 border-[#FF4B4B] p-6 rounded-r-lg mb-10">
            <p className="text-gray-700 italic text-sm md:text-base text-justify">
              {blog.summary}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div
          className="prose prose-lg max-w-none text-justify text-gray-700 prose-headings:text-gray-900 prose-p:mb-4 prose-a:text-[#FF4B4B] prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />
      </div>
    </div>
  );
}