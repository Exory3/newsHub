import useFetch from "../hooks/useFetch";
import { BASEURL } from "../utils/constants";
import { Link } from "react-router";
import {
  sidebar,
  sidebarCount,
  sidebarHeader,
  sidebarItem,
  sidebarLink,
} from "./Sidebar.styles";

interface Tags {
  data: {
    tag: string;
    count: number;
  }[];
}
function Sidebar() {
  const { data, error, status } = useFetch<Tags>(BASEURL + "/tags");
  const tags = data?.data ?? [];

  if (status === "error") return <p>{error}</p>;

  return (
    <>
      {status === "idle" && (
        <aside className={sidebar()}>
          <h2 className={sidebarHeader()}>Trending tags</h2>
          {tags.length > 0 && (
            <ul className="mb-4">
              {tags.map((tag) => (
                <li key={tag.tag} className={sidebarItem()}>
                  <Link className={sidebarLink()} to={`/news?tag=${tag.tag}`}>
                    {tag.tag}
                  </Link>
                  <span className={sidebarCount()}>{tag.count}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      )}
    </>
  );
}

export default Sidebar;
