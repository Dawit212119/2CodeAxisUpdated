'use client';

type BlogPost = {
  id: string;
  title: string;
  description: string;
  linkUrl: string | null;
  date: string;
  minutesToRead: number | null;
};

export default function BlogPostsClient({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-slate-600">
        No blog posts available at the moment.
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
          <p className="text-xs font-medium text-slate-500 mb-1">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {post.minutesToRead ? `${post.minutesToRead} min read` : ''}
          </p>
          <h3 className="text-lg font-bold text-[#016B61] mb-2">{post.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{post.description}</p>
          {post.linkUrl ? (
            <a
              href={post.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center text-sm font-semibold text-[#016B61] hover:text-[#70B2B2] cursor-pointer"
            >
              Read More
            </a>
          ) : (
            <span className="mt-auto inline-flex items-center text-sm font-semibold text-slate-400">
              Read More
            </span>
          )}
        </article>
      ))}
    </div>
  );
}


