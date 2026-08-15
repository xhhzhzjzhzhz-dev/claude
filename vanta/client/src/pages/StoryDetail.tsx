import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Story } from '@/types';

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/stories/${slug}`)
      .then(res => res.json())
      .then(data => { setStory(data.story || null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="page-loading">Loading...</div>;
  if (!story) return <div className="page-error">Story not found</div>;

  return (
    <main className="story-detail-page">
      <article className="container" style={{ maxWidth: '800px', padding: '6rem 2rem 4rem' }}>
        <Link to="/stories" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666' }}>← Back to Stories</Link>
        <span style={{ fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff4500', marginTop: '1rem', display: 'block' }}>{story.category}</span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '1rem 0' }}>{story.title}</h1>
        <div style={{ fontSize: '0.75rem', color: '#444', marginBottom: '2rem' }}>
          By {story.author} · {story.reading_time} min read
        </div>
        <div style={{ height: '300px', background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)', marginBottom: '2rem' }} />
        <div className="story-content" style={{ fontSize: '1rem', lineHeight: 1.8, color: '#aaa' }}>
          {story.content.split('\n').map((p, i) => <p key={i} style={{ marginBottom: '1.5rem' }}>{p}</p>)}
        </div>
      </article>
      <style>{`.story-detail-page{padding-top:80px}.page-loading,.page-error{padding-top:100px;text-align:center;color:#666}`}</style>
    </main>
  );
}
