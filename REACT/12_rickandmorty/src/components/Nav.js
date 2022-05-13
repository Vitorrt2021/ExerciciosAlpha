import styled from "styled-components";

const NavLayout = styled.nav`
  margin-top: -15px;
  width: 100%;
  height: 75px;
  background-color: rgb(207, 207, 207);

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style: none;
    height: 100%;
  }
  li {
    font-size: 1.7em;
    color: rgb(98, 98, 98);
    cursor: pointer;
    &:hover {
      color: rgb(50, 46, 46);
      text-decoration: underline;
    }
  }
`;

function Nav() {
  return (
    <NavLayout>
      <ul>
        <li>Home</li>
        <li>Rick and Morty</li>
      </ul>
    </NavLayout>
  );
}

export default Nav;
