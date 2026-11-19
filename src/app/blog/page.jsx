import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";
import FAQSection from "@/component/Home/FAQSection";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let blogs = [];
  let heroData = null;

  try {
    // Fetch blogs and hero banner data concurrently
    const [blogsRes, heroRes] = await Promise.all([
      apiGet("/blogs"),
      apiGet("/blogs-page"), // Correct API endpoint for banner
    ]);

    // Parse Blogs
    if (blogsRes && Array.isArray(blogsRes.data)) {
      blogs = blogsRes.data;
    } else if (Array.isArray(blogsRes)) {
      blogs = blogsRes;
    }

    // Parse Hero Data
    // The API returns the object directly, or sometimes wrapped in .data
    if (heroRes && heroRes.heroTitle) {
      heroData = heroRes;
    } else if (heroRes && heroRes.data) {
      heroData = heroRes.data;
    }
  } catch (error) {
    console.error("Failed to fetch blog data:", error);
  }

  // Fallbacks for banner text if API fails
  const title = heroData?.heroTitle || "Our Blog";
  const subtitle =
    heroData?.heroSubtitle ||
    "Explore the latest news, events, and stories from Apex School.";
  const imageUrl =
    heroData?.heroImage?.url ||
    "https://backend.apexschoolrupendehi.com/api/upload/images/get-image/gdfg-yibh4-DAq8-.jpeg";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dynamic Banner */}
      <div className="relative bg-gray-900 text-white h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center opacity-40"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="relative w-11/12 max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Blog List */}
      <div className="py-16">
        <div className="w-11/12 max-w-7xl mx-auto">
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
                        className="object-cover object-top"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                      {blog.blogType?.name || "News"}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-3">
                      {blog.summary}
                    </p>
                    <Link
                      href={`/blog/${blog.slug || blog.id}`}
                      className="inline-block text-secondary font-medium text-sm mt-auto"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No blogs available at the moment.
            </p>
          )}
        </div>
      </div>
      <FAQSection/>
    </div>
  );
}
