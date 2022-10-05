import { type FC } from "react";
import { Link } from "react-router-dom";
import { githubRepositoryUrl } from "../constant";

export const Index: FC = () => {
  return (
    <div>
      <h2>.NET JavaScript interop on WebAssembly Demonstration</h2>
      <p>You can try this technology by two contents</p>

      <ul>
        <li style={ContentLiStyle}>
          <Link to={"/basic"}>Basic</Link>
          <span style={{ padding: "0 8px" }}>/</span>Fetch some data from own
          dotnet library and list them
        </li>
        <li style={ContentLiStyle}>
          <Link to={"/advanced"}>Advanced</Link>
          <span style={{ padding: "0 8px" }}>/</span>Multi runtime (WIP)
        </li>
      </ul>

      <p>
        Interested?
        <a
          href={githubRepositoryUrl}
          target={"_blank"}
          style={{ padding: "0 8px" }}
        >
          Go Repository!
        </a>
      </p>
    </div>
  );
};

const ContentLiStyle: React.CSSProperties = {
  padding: "4px 0",
};
