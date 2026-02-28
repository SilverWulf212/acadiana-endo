export default function Home() {
  return (
    <main className="section">
      <div className="container">
        <div className="accent-bar mb-4" />
        <h1 className="heading-display mb-4">Acadiana Endodontics</h1>
        <p className="text-lead mb-8">
          Expert root canal therapy and endodontic care in Lafayette and New
          Iberia, Louisiana.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="/contact" className="btn btn-primary">
            Schedule Appointment
          </a>
          <a href="/services" className="btn btn-outline">
            Our Services
          </a>
        </div>
      </div>
    </main>
  );
}
