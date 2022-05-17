import styled from "styled-components";

const ModalStyle = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  rigth: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  .modal-content {
    width: 500px;
    background-color: #fff;
  }
  .modal-title {
    margin: 0;
  }
  .modal-body {
    padding: 10px;
    border-top: 1px solid #eee;
    border-botton: 1px solid #eee;
  }
`;
function Modal(props) {
  return (
    <ModalStyle>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{props.title}</h3>
        </div>
        <div className="modal-body">{props.children}</div>
      </div>
    </ModalStyle>
  );
}

export default Modal;
