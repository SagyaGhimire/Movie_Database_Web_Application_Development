function AIRecommendations({ recommendations = [], isLoading, error }) {
  return (
    <section className="mb-6 rounded-[32px] border border-[#D3C2A4] bg-[#F7EDD9] p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#7a6d57]">AI Recommendation Engine</p>
          <h3 className="text-2xl font-semibold text-slate-950">Recommended for you</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e5d4b8] px-3 py-1 text-sm text-slate-900">
          {isLoading ? (
            <>
              <span className="inline-block h-2.5 w-2.5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
              Thinking...
            </>
          ) : (
            `${recommendations.length} recommendation${recommendations.length === 1 ? "" : "s"}`
          )}
        </div>
      </div>


      {isLoading ? (
        <div className="flex items-center justify-center rounded-2xl border border-[#D3C2A4] bg-[#F5E6D4] p-8 text-[#6F5A42]">
          <div className="flex items-center gap-3">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#6F5A42] border-t-transparent" />
            <span>Generating movie recommendations from your watchlist…</span>
          </div>
        </div>
      ) : recommendations?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-1">
          {recommendations.map((item, index) => (
            <article key={`${item.title}-${index}`} className="rounded-3xl border border-[#D3B98F] bg-[#F6E3D0] p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#7A5B3F]">Recommendation {index + 1}</p>
                  <h4 className="mt-2 text-xl font-bold text-slate-950">{item.title}</h4>
                </div>
                <div className="rounded-full bg-[#B58E59] px-3 py-1 text-xs uppercase tracking-[0.15em] text-white">
                  AI Pick
                </div>
              </div>
              <p className="text-[#5B4732]">{item.reason}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#D3C2A4] bg-[#F5E6D4] p-8 text-[#6F5A42]">
          AI recommendations will appear here once you click the button.
        </div>
      )}
    </section>
  );
}

export default AIRecommendations;
