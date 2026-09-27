interface PagesFunctionContext {
  request: Request;
}

interface EscoSuggestion {
  title?: string;
  preferredLabel?: Record<string, string>;
  searchHit?: string;
}

interface EscoSuggestionResponse {
  _embedded?: {
    results?: EscoSuggestion[];
  };
}

export const onRequestGet = async ({ request }: PagesFunctionContext) => {
  const incomingUrl = new URL(request.url);
  const text = incomingUrl.searchParams.get("text")?.trim() ?? "";

  if (text.length < 2) {
    return Response.json({ skills: [] });
  }

  const upstreamUrl = new URL("https://ec.europa.eu/esco/api/suggest2");
  upstreamUrl.searchParams.set("text", text);
  upstreamUrl.searchParams.set("language", "en");
  upstreamUrl.searchParams.set("type", "skill");
  upstreamUrl.searchParams.set("limit", "12");

  try {
    const response = await fetch(upstreamUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return Response.json({ skills: [] }, { status: 502 });
    }

    const data = (await response.json()) as EscoSuggestionResponse;
    const skills = (data._embedded?.results ?? [])
      .map((suggestion) => suggestion.title ?? suggestion.preferredLabel?.en ?? suggestion.searchHit ?? "")
      .map((skill) => skill.trim())
      .filter(Boolean);

    return Response.json(
      { skills: [...new Set(skills)] },
      { headers: { "Cache-Control": "public, max-age=3600" } },
    );
  } catch {
    return Response.json({ skills: [] }, { status: 502 });
  }
};
