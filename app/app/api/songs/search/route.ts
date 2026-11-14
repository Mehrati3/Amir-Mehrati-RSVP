
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("q")?.trim();

  if (!term || term.length < 2) {
    return Response.json({ results: [] });
  }

  if (term.length > 100) {
    return Response.json(
      { error: "Search is too long." },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({
      term,
      country: "eg",
      media: "music",
      entity: "song",
      limit: "8",
      explicit: "No",
    });

    const response = await fetch(
      `https://itunes.apple.com/search?${params.toString()}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Music search is temporarily unavailable." },
        { status: 502 }
      );
    }

    const data = await response.json();

    const results = (data.results || []).map((song: any) => ({
      trackId: song.trackId,
      trackName: song.trackName,
      artistName: song.artistName,
      albumName: song.collectionName,
      artworkUrl: song.artworkUrl100,
      trackUrl: song.trackViewUrl,
    }));

    return Response.json({ results });
  } catch (error) {
    console.error("Song search error:", error);

    return Response.json(
      { error: "Unable to search for songs right now." },
      { status: 500 }
    );
  }
}
