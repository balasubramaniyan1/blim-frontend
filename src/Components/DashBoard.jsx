
import { useLocation, useNavigate } from 'react-router-dom'

function DashBoard() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const email = state?.email || 'Signed-in account'

  return (
    <main className="dashboard-page">
      <nav className="dashboard-nav" aria-label="Main navigation">
        <a className="dashboard-brand" href="/" aria-label="Blimmet home">
          <span className="brand-symbol">b.</span>
          <span>blimmet<strong>.</strong></span>
        </a>
        <div className="dashboard-account">
          <div className="account-avatar" aria-hidden="true">{email[0].toUpperCase()}</div>
          <span className="account-email">{email}</span>
          <button className="sign-out-button" onClick={() => navigate('/')} type="button">
            Sign out
          </button>
        </div>
      </nav>

      <section className="dashboard-content">
        <div className="dashboard-greeting">
          <p className="dashboard-eyebrow">A NOTE FOR YOUR DAY</p>
          <h1>Make a little<br /><strong>room to begin.</strong></h1>
          <p className="dashboard-lead">
            You don't need the whole plan. Just a place to start, and a moment to notice what matters.
          </p>
        </div>

        <article className="featured-story">
          <div className="story-art" aria-hidden="true">
            <div className="story-art-sun" />
            <div className="story-art-line line-one" />
            <div className="story-art-line line-two" />
            <div className="story-art-label">FIELD NOTES&nbsp; / &nbsp;01</div>
            <div className="story-art-stamp">✳</div>
          </div>
          <div className="story-body">
            <div className="article-meta">
              <span>SMALL THINGS, WELL MADE</span>
              <span>4 MIN READ</span>
            </div>
            <h2>The quiet power of starting small</h2>
            <p>
              Big changes rarely arrive all at once. More often, they begin as a tiny promise:
              ten minutes with a new idea, one page in a notebook, one thoughtful step.
            </p>
            <p>
              Give that first step a little space today. Let it be imperfect, let it be yours,
              and see what it makes possible tomorrow.
            </p>
            <div className="article-byline">
              <span className="byline-mark">b.</span>
              <span>A little inspiration from Blimmet</span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </article>

        <p className="dashboard-footer">Take what you need. Leave room for more.</p>
      </section>
    </main>
  )
}

export default DashBoard