import { loadEnv } from "@/utils/common";
import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

export async function searchPhotos(query: string): Promise<Photos> {
  const api = createApi({
    accessKey: loadEnv("UNSPLASH_ACCESS_KEY"),
  });
  const res = await api.search.getPhotos({ query, perPage: 9 });
  if (res.errors) {
    throw new Error(res.errors[0]);
  }
  console.log(`Found: ${JSON.stringify(res.response.results)}`);

  return res.response;
}
