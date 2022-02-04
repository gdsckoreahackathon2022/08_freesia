import styled from "styled-components";

function List({ allCenters, setFocusedCenterId }) {
  const ListWrapper = styled.article`
    height: 100%;
    overflow: auto;
  `;
  const ListWrap = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
    padding-bottom: 15px;
    border-top: 1px solid #dddddd;
    &:hover {
      box-shadow: 3px 3px 20px lightgrey;
    }
  `;
  return (
    <ListWrapper>
      {allCenters.map((center) => (
        <ListWrap key={center.id}>
          <h3>{center["센터명"]}</h3>
          <span>{center["전화번호"]}</span>
          <span>{center["주소"]}</span>
        </ListWrap>
      ))}
    </ListWrapper>
  );
}

export default List;
