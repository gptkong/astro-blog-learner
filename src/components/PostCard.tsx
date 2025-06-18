import FormattedDate from "./FormattedDate.astro";
import { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";

interface Props {
    post: CollectionEntry<"blog">;
}

export default function PostCard({ post }: Props) {
    const { title, description, pubDate, heroImage, tags } = post.data;

    return (
        <div className="post-card p-6 mb-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-6">
                {heroImage && (
                    <div className="w-full md:w-1/3">
                        <Image
                            src={heroImage}
                            alt={title}
                            width={400}
                            height={300}
                        />
                    </div>
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        {title}
                    </h2>
                    <div className="text-sm text-gray-500 mb-3">
                        {/* <FormattedDate date={pubDate} /> */}
                    </div>
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <p className="text-gray-600 line-clamp-3">{description}</p>
                </div>
            </div>
        </div>
    );
}