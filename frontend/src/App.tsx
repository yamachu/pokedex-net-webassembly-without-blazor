import "modern-normalize/modern-normalize.css";

import type { FC, PropsWithChildren } from "react";
import { POKEDEX_DICT_PATH } from "../env";
import { useFetchPokemons } from "./hooks/useFetchPokemons";

export const App: FC = () => {
  const { data: pokemons } = useFetchPokemons(POKEDEX_DICT_PATH);

  return (
    <div>
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
            <NavItem href={"/"}>Index</NavItem>
          </ul>
          <NavItem
            href={
              "https://github.com/yamachu/pokedex-net-webassembly-without-blazor"
            }
            Container={"div"}
            target={"_blank"}
          >
            GitHub
          </NavItem>
        </nav>
      </header>
      <div style={{ padding: "8px 16px" }}>
        <div>
          <p>.NET JavaScript interop on WebAssembly Demo</p>
          <p>Listing Kanto Pokemons!</p>
          <ul>
            {pokemons?.map((v) => (
              <li style={{ listStyleType: "none" }} key={v.id}>
                {("000" + v.id).slice(-3)}: {v.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const NavItem: FC<
  PropsWithChildren<
    {
      href: string;
      Container?: React.ElementType;
    } & { target?: React.ComponentProps<"a">["target"] }
  >
> = ({ href, target, Container = "li", children }) => (
  <Container style={{ listStyleType: "none", padding: "0 16px" }}>
    <a href={href} target={target}>
      {children}
    </a>
  </Container>
);
