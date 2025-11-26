// import { BASEURL } from "../../utils/constants";

// interface HomeLoader {
//   data: {
//     tag: string;
//     count: number;
//   }[];
// }
// export async function homePageLoader(): Promise<
//   HomeLoader | { message: string }
// > {
//   try {
//     const res = await fetch(BASEURL + "/tags");
//     if (!res.ok) {
//       return { message: "Failed to fetch tags list" };
//     }
//     const data: HomeLoader = await res.json();
//     return data;
//   } catch {
//     return { message: "Network error while fetching tags list" };
//   }
// }
