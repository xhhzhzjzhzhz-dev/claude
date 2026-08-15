import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import type { Story } from '@/types';

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => { setStories(data.stories || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.story-card', { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.story-grid', start: 'top 70%' } });
    });
    return () => ctx.revert();
  }, [stories]);

  if (loading) return <div className="page-loading">Loading...</div>;

  return (
    <main className="stories-page">
      <section className="stories-hero">
        <h1>STORIES</h1>
        <p>INSIGHTS FROM THE EDGE OF AUTOMOTIVE EXCELLENCE</p>
      </section>
      <section className="container" style={{ padding: '4rem 2rem' }}>
        <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {stories.map((story) => (
            <Link key={story.id} to={`/stories/${story.slug}`} className="story-card" style={{ display: 'block', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
              <div style={{ height: '200px', background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' }} />
              <div style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff4500' }}>{story.category}</span>
                <h3 style={{ fontSize: '1.25rem', margin: '0.5rem 0' }}>{story.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.6 }}>{story.excerpt}</p>
                <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#444' }}>
                  <span>{story.author}</span> · <span>{story.reading_time} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <style>{`.stories-page{padding-top:80px}.stories-hero{min-height:40vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:4rem 2rem;background:radial-gradient(ellipse at center,#1a1a1a 0%,#0a0a0a 100%)}.stories-hero h1{font-size:clamp(3rem,10vw,6rem);margin-bottom:1rem}.stories-hero p{font-size:0.875rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--color-text-muted)}.story-card:hover{transform:translateY(-5px)}.page-loading{padding-top:100px;text-align:center;color:#666}`}</style>
    </main>
  );
}
