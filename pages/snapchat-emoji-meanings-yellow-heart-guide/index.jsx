import React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = 'https://www.1solutions.biz';
const PAGE_URL = `${SITE_URL}/snapchat-emoji-meanings-yellow-heart-guide/`;
const PUBLISHED = '2024-03-15T08:00:00+00:00';
const MODIFIED  = '2025-06-10T10:00:00+00:00';

const FRIEND_EMOJIS = [
  { emoji: '💛', name: 'Yellow Heart', meaning: '#1 Best Friend', detail: 'You and this person send the most Snaps to each other. You are each other\'s number one Best Friend.' },
  { emoji: '❤️', name: 'Red Heart', meaning: '#1 Best Friends for 2 weeks', detail: 'You have been each other\'s #1 Best Friend for at least two weeks straight. The yellow heart upgraded to red!' },
  { emoji: '💕', name: 'Pink Hearts', meaning: '#1 Best Friends for 2 months', detail: 'Two months of being each other\'s top friend. This is the highest friendship milestone Snapchat tracks.' },
  { emoji: '😬', name: 'Grimacing Face', meaning: 'Mutual #1 Best Friend', detail: 'Your #1 Best Friend is also their #1 Best Friend. You both snap the same person the most.' },
  { emoji: '😎', name: 'Sunglasses Face', meaning: 'Close mutual friend', detail: 'One of your Best Friends is also one of their Best Friends — you share a close mutual contact.' },
  { emoji: '😏', name: 'Smirking Face', meaning: 'Their BFF, but not yours', detail: 'You are one of their Best Friends but they are not one of yours. You snap them more than they snap you.' },
  { emoji: '😊', name: 'Smiling Face', meaning: 'Best Friend', detail: 'This person is one of your Best Friends (not #1, but in your top 8). You snap each other frequently.' },
  { emoji: '⭐', name: 'Gold Star', meaning: 'Replayed their Snap', detail: 'Someone has replayed one of this person\'s Snaps in the last 24 hours. Their content is worth watching twice!' },
  { emoji: '🎂', name: 'Birthday Cake', meaning: 'It\'s their birthday', detail: 'This friend has a birthday today. Snapchat shows this if they have added their birthday to their profile.' },
  { emoji: '🆕', name: 'New Badge', meaning: 'New friend', detail: 'You recently added this person as a friend. The badge disappears after a few days.' },
];

const STREAK_EMOJIS = [
  { emoji: '🔥', name: 'Fire', meaning: 'Snapstreak active', detail: 'You and this friend have snapped each other within 24 hours for consecutive days. The number next to 🔥 shows how many days your streak has been going.' },
  { emoji: '💯', name: 'Hundred', meaning: '100-day Snapstreak', detail: 'You have maintained a Snapstreak for 100 days straight. The 💯 appears alongside 🔥 to celebrate the milestone.' },
  { emoji: '⌛', name: 'Hourglass', meaning: 'Streak about to expire', detail: 'Your Snapstreak is at risk — you or your friend has not sent a Snap in nearly 24 hours. Send one now to keep it alive!' },
];

const STORY_EMOJIS = [
  { emoji: '🔊', name: 'Speaker', meaning: 'Subscribed to their Story', detail: 'You are subscribed to this person\'s public Story updates.' },
  { emoji: '🌙', name: 'Crescent Moon', meaning: 'Do Not Disturb on', detail: 'Notifications from this friend are muted. You will still see their Snaps, just without alerts.' },
  { emoji: '📌', name: 'Pin', meaning: 'Pinned conversation', detail: 'You have pinned this conversation to the top of your chat list for quick access.' },
];

const FAQS = [
  { q: 'What does the yellow heart mean on Snapchat?', a: 'The yellow heart 💛 means you are #1 Best Friends with this person — you send the most Snaps to each other and they send the most back to you. It is the first "best friends" milestone. If you keep the streak going for two weeks, the yellow heart upgrades to a red heart ❤️.' },
  { q: 'How does the yellow heart turn into a red heart?', a: 'Once you have been each other\'s #1 Best Friend (yellow heart) for two weeks in a row without interruption, Snapchat upgrades it to a red heart ❤️. Keep snapping consistently every day to maintain it.' },
  { q: 'What do the pink hearts 💕 mean on Snapchat?', a: 'Pink hearts 💕 mean you have been each other\'s #1 Best Friend for two months straight. It is the highest friendship badge Snapchat awards and is hard to earn — you both need to consistently snap each other the most for 60+ days.' },
  { q: 'Can you lose the yellow heart?', a: 'Yes. If you or your friend starts snapping someone else more often, the yellow heart will disappear. Snapchat recalculates Best Friends daily, so it can change quickly if your snap habits shift.' },
  { q: 'What does the grimacing face 😬 mean?', a: 'The grimacing face means your #1 Best Friend is the same person as their #1 Best Friend. You and this person both snap a third person the most. It can feel a little awkward — hence the grimace!' },
  { q: 'How many Best Friends can you have on Snapchat?', a: 'Snapchat allows up to 8 Best Friends. The #1 Best Friend (shown with a heart emoji) is the person you snap the most. The other 7 are friends you snap very frequently, shown with a 😊 smiling face.' },
  { q: 'What is a Snapstreak and how do you keep it?', a: 'A Snapstreak (🔥) is the number of consecutive days you and a friend have each sent a Snap (not a Chat message) within 24 hours of each other. To maintain it, both of you must send at least one Snap photo or video every day.' },
  { q: 'How do I customise Snapchat friend emojis?', a: 'Go to your Profile → ⚙️ Settings → scroll to "Customize Emojis" (under "Additional Services" or "Features"). You can change any of the default emoji to any emoji you prefer. The change only affects what you see — your friends see their own settings.' },
  { q: 'What does the hourglass ⌛ mean on Snapchat?', a: 'The hourglass warns you that your Snapstreak is about to expire. You and your friend have not both sent a Snap within the last 20 hours. Send a Snap now — not a Chat — to save the streak before time runs out.' },
  { q: 'Why did my best friend emoji disappear?', a: 'Your friend emoji changes when your snapping behaviour shifts. If you snap someone new more often, or your friend starts snapping someone else more, the heart emoji will change or disappear. Emojis update daily based on recent activity.' },
];

export default function SnapchatEmojiMeanings() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'Snapchat Emoji Meanings: Yellow Heart, Red Heart & Every Friend Emoji Explained',
      description: 'Complete guide to every Snapchat emoji meaning — yellow heart, red heart, pink hearts, fire streaks, hourglass and more. Learn what each friend emoji means.',
      url: PAGE_URL,
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
      author: { '@type': 'Person', name: 'Atul Chaudhary', url: `${SITE_URL}/` },
      publisher: { '@type': 'LocalBusiness', '@id': `${SITE_URL}/#organization`, name: '1Solutions', logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/1solutions-logo.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      image: { '@type': 'ImageObject', url: `${SITE_URL}/images/snapchat-emoji-meanings.jpg` },
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Snapchat Emoji Meanings', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <Head>
        <title>Snapchat Emoji Meanings: Yellow Heart, Red Heart &amp; All Friend Emojis (2025)</title>
        <meta name="description" content="What does the yellow heart mean on Snapchat? Complete guide to every Snapchat emoji — yellow heart 💛, red heart ❤️, pink hearts 💕, fire streaks 🔥, hourglass ⌛ and more." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Snapchat Emoji Meanings: Yellow Heart, Red Heart & All Friend Emojis Explained" />
        <meta property="og:description" content="Complete guide to every Snapchat emoji meaning — yellow heart, red heart, pink hearts, fire streaks, hourglass and more. What each emoji next to a friend's name really means." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${SITE_URL}/images/snapchat-emoji-meanings.jpg`} />
        <meta property="article:published_time" content={PUBLISHED} />
        <meta property="article:modified_time" content={MODIFIED} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <style>{`
        .snap-page { max-width: 860px; margin: 0 auto; padding: 48px 24px 80px; color: #1f2937; font-family: 'Inter', sans-serif; line-height: 1.75; }
        .snap-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6b7280; margin-bottom: 32px; flex-wrap: wrap; }
        .snap-breadcrumb a { color: #114171; text-decoration: none; }
        .snap-breadcrumb a:hover { text-decoration: underline; }
        .snap-breadcrumb span { color: #d1d5db; }
        .snap-meta { display: flex; align-items: center; gap: 16px; font-size: 13px; color: #6b7280; margin-bottom: 40px; flex-wrap: wrap; }
        .snap-meta-dot { width: 4px; height: 4px; border-radius: 50%; background: #d1d5db; }
        .snap-h1 { font-size: clamp(28px, 5vw, 42px); font-weight: 800; line-height: 1.2; color: #050D1F; margin: 0 0 16px; }
        .snap-intro { font-size: 18px; color: #374151; line-height: 1.8; margin: 0 0 48px; border-left: 4px solid #FE9700; padding-left: 20px; background: #fffbf0; padding: 20px 24px; border-radius: 0 12px 12px 0; }
        .snap-toc { background: #f0f7ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 28px 32px; margin: 0 0 52px; }
        .snap-toc h2 { font-size: 15px; font-weight: 700; color: #114171; margin: 0 0 14px; text-transform: uppercase; letter-spacing: 1px; }
        .snap-toc ol { margin: 0; padding-left: 20px; }
        .snap-toc li { margin-bottom: 8px; }
        .snap-toc a { color: #114171; text-decoration: none; font-size: 15px; }
        .snap-toc a:hover { text-decoration: underline; }
        .snap-section { margin-bottom: 56px; }
        .snap-h2 { font-size: clamp(22px, 3.5vw, 30px); font-weight: 700; color: #050D1F; margin: 0 0 8px; }
        .snap-h2-sub { font-size: 15px; color: #6b7280; margin: 0 0 32px; }
        .snap-table { width: 100%; border-collapse: collapse; font-size: 15px; margin-bottom: 16px; }
        .snap-table th { background: #114171; color: #fff; padding: 14px 16px; text-align: left; font-weight: 600; }
        .snap-table th:first-child { border-radius: 8px 0 0 0; width: 60px; text-align: center; }
        .snap-table th:last-child { border-radius: 0 8px 0 0; }
        .snap-table td { padding: 14px 16px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
        .snap-table td:first-child { text-align: center; font-size: 28px; }
        .snap-table td strong { color: #114171; }
        .snap-table tr:hover td { background: #f8faff; }
        .snap-table tr:last-child td { border-bottom: none; }
        .snap-callout { background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 1px solid #7dd3fc; border-radius: 12px; padding: 20px 24px; margin: 32px 0; display: flex; gap: 14px; align-items: flex-start; }
        .snap-callout-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
        .snap-callout p { margin: 0; font-size: 15px; color: #1e3a5f; line-height: 1.7; }
        .snap-callout strong { color: #0c2d4f; }
        .snap-faq { border-top: 2px solid #e5e7eb; }
        .snap-faq-item { border-bottom: 1px solid #e5e7eb; }
        .snap-faq-q { display: block; width: 100%; text-align: left; background: none; border: none; padding: 20px 0; font-size: 16px; font-weight: 600; color: #050D1F; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .snap-faq-q:hover { color: #114171; }
        .snap-faq-a { font-size: 15px; color: #374151; line-height: 1.75; padding: 0 0 20px; }
        .snap-cta-box { background: linear-gradient(135deg, #0F3460, #114171); border-radius: 16px; padding: 40px; text-align: center; color: #fff; margin: 56px 0; }
        .snap-cta-box h2 { font-size: 24px; font-weight: 700; margin: 0 0 12px; }
        .snap-cta-box p { color: rgba(255,255,255,0.8); margin: 0 0 24px; font-size: 16px; }
        .snap-cta-btn { display: inline-block; background: #FE9700; color: #fff; font-weight: 700; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; }
        .snap-cta-btn:hover { background: #e88600; }
        .snap-related { margin-top: 56px; border-top: 2px solid #e5e7eb; padding-top: 40px; }
        .snap-related h2 { font-size: 20px; font-weight: 700; color: #050D1F; margin: 0 0 20px; }
        .snap-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .snap-related-link { display: block; background: #f8faff; border: 1px solid #e0e7ff; border-radius: 10px; padding: 16px 20px; text-decoration: none; color: #114171; font-weight: 500; font-size: 15px; transition: all 0.2s; }
        .snap-related-link:hover { background: #eef2ff; border-color: #114171; }
        @media (max-width: 640px) {
          .snap-page { padding: 32px 16px 60px; }
          .snap-table { font-size: 14px; }
          .snap-table td:first-child { font-size: 22px; }
          .snap-cta-box { padding: 28px 20px; }
        }
      `}</style>

      <div className="snap-page">
        {/* Breadcrumb */}
        <nav className="snap-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blog">Blog</Link>
          <span>/</span>
          <span>Snapchat Emoji Meanings</span>
        </nav>

        {/* Header */}
        <h1 className="snap-h1">Snapchat Emoji Meanings: Yellow Heart, Red Heart &amp; Every Friend Emoji Explained</h1>
        <div className="snap-meta">
          <span>By Atul Chaudhary</span>
          <span className="snap-meta-dot" />
          <span>Updated June 2025</span>
          <span className="snap-meta-dot" />
          <span>8 min read</span>
        </div>

        <p className="snap-intro">
          Noticed a 💛 yellow heart next to your best friend, or an ⌛ hourglass warning you about a streak? Every emoji Snapchat places beside a friend&rsquo;s name tells a story about your relationship. This guide decodes every single one — from the first yellow heart all the way to the 100-day streak badge.
        </p>

        {/* TOC */}
        <div className="snap-toc">
          <h2>Table of Contents</h2>
          <ol>
            <li><a href="#friend-emojis">Friend &amp; Best Friend Emojis</a></li>
            <li><a href="#streak-emojis">Snapstreak Emojis (🔥 Fire, 💯 Hundred, ⌛ Hourglass)</a></li>
            <li><a href="#story-emojis">Story &amp; Chat Emojis</a></li>
            <li><a href="#hearts-explained">Hearts Explained: Yellow → Red → Pink</a></li>
            <li><a href="#how-to-customise">How to Customise Your Friend Emojis</a></li>
            <li><a href="#faq">Frequently Asked Questions</a></li>
          </ol>
        </div>

        {/* ── SECTION 1: Friend Emojis ── */}
        <section className="snap-section" id="friend-emojis">
          <h2 className="snap-h2">Friend &amp; Best Friend Emojis</h2>
          <p className="snap-h2-sub">These appear next to friends&rsquo; names based on how often you snap each other.</p>

          <div style={{ overflowX: 'auto' }}>
            <table className="snap-table">
              <thead>
                <tr>
                  <th>Emoji</th>
                  <th>Name</th>
                  <th>What It Means</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {FRIEND_EMOJIS.map((row, i) => (
                  <tr key={i}>
                    <td>{row.emoji}</td>
                    <td><strong>{row.name}</strong></td>
                    <td>{row.meaning}</td>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="snap-callout">
            <span className="snap-callout-icon">💡</span>
            <p><strong>Good to know:</strong> Snapchat recalculates Best Friends every day. If you suddenly snap someone new a lot, your friend emojis can change overnight. The #1 Best Friend spot always goes to whoever you exchange the most Snaps with in both directions.</p>
          </div>
        </section>

        {/* ── SECTION 2: Streak Emojis ── */}
        <section className="snap-section" id="streak-emojis">
          <h2 className="snap-h2">Snapstreak Emojis</h2>
          <p className="snap-h2-sub">Snapstreaks measure how many consecutive days you and a friend have each sent a Snap.</p>

          <div style={{ overflowX: 'auto' }}>
            <table className="snap-table">
              <thead>
                <tr>
                  <th>Emoji</th>
                  <th>Name</th>
                  <th>What It Means</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {STREAK_EMOJIS.map((row, i) => (
                  <tr key={i}>
                    <td>{row.emoji}</td>
                    <td><strong>{row.name}</strong></td>
                    <td>{row.meaning}</td>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="snap-callout">
            <span className="snap-callout-icon">⚠️</span>
            <p><strong>Streak rules:</strong> Only Snap photos and videos count towards a streak — Chat messages do <em>not</em>. Both friends must send a Snap (not just one person) within every 24-hour window to keep it going. If you see the ⌛ hourglass, you have a few hours left — send a Snap immediately.</p>
          </div>
        </section>

        {/* ── SECTION 3: Story & Chat Emojis ── */}
        <section className="snap-section" id="story-emojis">
          <h2 className="snap-h2">Story &amp; Chat Emojis</h2>
          <p className="snap-h2-sub">These emojis appear in Stories and the Chat screen.</p>

          <div style={{ overflowX: 'auto' }}>
            <table className="snap-table">
              <thead>
                <tr>
                  <th>Emoji</th>
                  <th>Name</th>
                  <th>What It Means</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {STORY_EMOJIS.map((row, i) => (
                  <tr key={i}>
                    <td>{row.emoji}</td>
                    <td><strong>{row.name}</strong></td>
                    <td>{row.meaning}</td>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 4: Hearts Explained ── */}
        <section className="snap-section" id="hearts-explained">
          <h2 className="snap-h2">Hearts Explained: Yellow → Red → Pink</h2>
          <p className="snap-h2-sub">The heart progression is the most sought-after milestone on Snapchat.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { emoji: '💛', label: 'Yellow Heart', days: 'Day 1', desc: 'You become each other\'s #1 Best Friend. The yellow heart appears as soon as you are both sending the most Snaps to each other.' },
              { emoji: '❤️', label: 'Red Heart', days: '14 days', desc: 'After two uninterrupted weeks as each other\'s #1 BFF, the yellow heart turns red. Keep snapping every day — one missed exchange resets the clock.' },
              { emoji: '💕', label: 'Pink Hearts', days: '2 months', desc: 'The ultimate friendship badge. You have maintained the #1 Best Friend status for two full months. Only the most dedicated Snapchat pairs reach this level.' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#f8faff', border: '1px solid #e0e7ff', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>{card.emoji}</div>
                <div style={{ fontWeight: '700', color: '#114171', fontSize: '16px', marginBottom: '4px' }}>{card.label}</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#FE9700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{card.days}</div>
                <p style={{ fontSize: '14px', color: '#374151', margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="snap-callout">
            <span className="snap-callout-icon">🔁</span>
            <p><strong>Can you lose the hearts?</strong> Yes — if either of you starts snapping someone else more, the #1 Best Friend title shifts and the hearts disappear. Hearts are recalculated daily, so consistent daily snapping is key to keeping them.</p>
          </div>
        </section>

        {/* ── SECTION 5: How to Customise ── */}
        <section className="snap-section" id="how-to-customise">
          <h2 className="snap-h2">How to Customise Your Snapchat Friend Emojis</h2>
          <p style={{ color: '#374151', marginBottom: '24px' }}>
            Snapchat lets you swap the default emojis for any emoji you like. The custom emojis only show on <em>your</em> device — your friends see whatever they have set.
          </p>
          <ol style={{ color: '#374151', lineHeight: 2, paddingLeft: '20px', fontSize: '16px' }}>
            <li>Open Snapchat and tap your <strong>Profile</strong> icon (top-left).</li>
            <li>Tap the <strong>⚙️ Settings</strong> gear (top-right of your profile).</li>
            <li>Scroll down to <strong>&quot;Customize Emojis&quot;</strong> (under Additional Services or Features).</li>
            <li>Tap any emoji (e.g. &quot;#1 Best Friend&quot;) to open the emoji picker.</li>
            <li>Choose your preferred emoji and tap <strong>Save</strong>.</li>
          </ol>
          <div className="snap-callout">
            <span className="snap-callout-icon">📱</span>
            <p><strong>Note:</strong> If you cannot find &quot;Customize Emojis&quot; in Settings, make sure your Snapchat app is updated to the latest version. The option appears under different sections depending on the version.</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="snap-section" id="faq">
          <h2 className="snap-h2">Frequently Asked Questions</h2>
          <div className="snap-faq">
            {FAQS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="snap-cta-box">
          <h2>Need Help Growing Your Social Media Presence?</h2>
          <p>Our digital marketing team helps businesses build real engagement — not just emoji counts. Let&rsquo;s talk strategy.</p>
          <Link href="/contact-us/" className="snap-cta-btn">Get a Free Consultation</Link>
        </div>

        {/* Related */}
        <div className="snap-related">
          <h2>Related Articles</h2>
          <div className="snap-related-grid">
            <Link href="/what-does-a-red-heart-mean-on-snapchat" className="snap-related-link">❤️ What Does a Red Heart Mean on Snapchat?</Link>
            <Link href="/social-media-mistakes-that-kill-your-organic-reach" className="snap-related-link">📉 Social Media Mistakes That Kill Organic Reach</Link>
            <Link href="/how-to-write-the-perfect-tiktok-bio" className="snap-related-link">✍️ How to Write the Perfect TikTok Bio</Link>
            <Link href="/top-100-social-media-sites-complete-guide" className="snap-related-link">🌐 Top 100 Social Media Sites: Complete Guide</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="snap-faq-item">
      <button className="snap-faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="snap-faq-a">{a}</div>}
    </div>
  );
}

