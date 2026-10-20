export default function Loading() {
  return (
    <main className="route-loading" aria-busy="true" aria-live="polite">
      <div className="route-loading-inner">
        <p className="punk-kicker">ROUTE CHANGE / SIGNAL ACQUIRED</p>
        <h1>Turning the <em>page.</em></h1>
        <p className="route-loading-copy">Opening the next part of Joe Grand&apos;s field guide.</p>
        <div className="route-loading-meter" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="route-loading-lines" aria-hidden="true"><i /><i /><i /></div>
      </div>
    </main>
  );
}
