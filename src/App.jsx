import Login from './Components/Login.jsx'

function App() {
  return (
    <main className="login-page flex min-h-screen items-center justify-center">
      <section
        className="login-card grid w-full overflow-hidden md:grid-cols-2"
        aria-label="Blimmet sign in"
      >
        <div className="story-panel relative hidden flex-col justify-between overflow-hidden text-white md:flex">
          <a className="story-brand relative z-10 flex items-center font-bold tracking-tight" href="/" aria-label="Blimmet home">
          <div className="brand-symbol grid place-items-center">b.</div>
          <div>blimmet<strong className="brand-dot">.</strong></div>
          </a>

          <div className="story-copy relative z-10">
          <div className="story-kicker font-bold uppercase">
              A home for your next big thing
          </div>
          <h1 className="story-heading font-semibold">
          Make room<br />for <strong className="font-semibold brand-highlight">what's next.</strong>
            </h1>
          <p className="story-description text-white/70">
              Your ideas, plans, and little wins all belong somewhere.
            </p>
          </div>

          <div className="idea-orbit" aria-hidden="true">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <div className="orbit-core">b</div>
            <div className="idea-chip chip-one">little idea <b>↗</b></div>
            <div className="idea-chip chip-two"><i /> in motion</div>
            <div className="idea-chip chip-three">✳</div>
          </div>

          <p className="story-caption relative z-10 text-white/50">A calmer corner of the internet.</p>
        </div>

        <Login />
      </section>
    </main>
  )
}

export default App