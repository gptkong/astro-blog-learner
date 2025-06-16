import FormattedDate from "./FormattedDate.astro";

export default function PostCard({ post }) {

    return (
        <div className="post-card">
            <h2>{post.data.title}</h2>
        </div>
    );
}