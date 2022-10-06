import "modern-normalize/modern-normalize.css";

import { FC, PropsWithChildren } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { githubRepositoryUrl } from "./constant";
import { Advanced } from "./pages/Advanced";
import { Basic } from "./pages/Basic";
import { Index } from "./pages/Index";

export const App: FC = () => {
  return (
    <HashRouter>
      <header
        style={{
          height: "auto",
          position: "sticky",
          top: 0,
          padding: "16px 8px",
          backgroundColor: "whitesmoke",
          borderBottom: "1px solid",
        }}
      >
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
          <ul style={{ display: "flex", margin: 0, padding: 0 }}>
            <NavItemContainer>
              <Link to={"/"}>Index</Link>
            </NavItemContainer>
            <NavItemContainer>
              <Link to={"/basic"}>Basic</Link>
            </NavItemContainer>
            <NavItemContainer>
              <Link to={"/advanced"}>Advanced</Link>
            </NavItemContainer>
          </ul>
          <NavItemContainer Container={"div"}>
            <a href={githubRepositoryUrl} target={"_blank"}>
              GitHub
            </a>
          </NavItemContainer>
        </nav>
      </header>
      <div style={{ padding: "8px 16px" }}>
        <Routes>
          <Route index={true} element={<Index />} />
          <Route path={"/basic"} element={<Basic />} />
          <Route path={"/advanced"} element={<Advanced />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

const NavItemContainer: FC<
  PropsWithChildren<{
    Container?: React.ElementType;
  }>
> = ({ Container = "li", children }) => (
  <Container style={{ listStyleType: "none", padding: "0 16px" }}>
    {children}
  </Container>
);
