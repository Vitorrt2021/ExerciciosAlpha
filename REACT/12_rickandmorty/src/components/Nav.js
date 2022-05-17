import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

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
  a {
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
  const [modalIsShow, setModalIsShow] = useState(false);
  function setModal(e) {
    setModalIsShow(e);
  }

  return (
    <>
      {modalIsShow && (
        <Modal>
          <h3>Tem certeza que quer sair?</h3>
          <button onClick={() => setModal(false)}>Não</button>
          <button onClick={() => setModal(false)}>Sim</button>
        </Modal>
      )}
      <NavLayout>
        <ul>
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/rick"}>Rick and Morty</Link>
          <a onClick={() => setModal(true)}>Logout</a>
        </ul>
      </NavLayout>
    </>
  );
}

export default Nav;
