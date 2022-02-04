import styled from "styled-components";

function CenterList({ allCenters, setFocusedCenter }) {
  const ListWrapper = styled.article`
    height: 100%;
    overflow: auto;
  `;
  const ListWrap = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
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
        <ListWrap
          key={center.id}
          onMouseEnter={() => {
            setFocusedCenter({
              id: center.id,
              lat: center.lat,
              lng: center.lng,
            });
          }}
        >
          <h3>{center.name}</h3>
          <span>{center.contact}</span>
          <a
            style={{ textDecoration: "none", color: "black" }}
            href={center.websiteUrl}
          >
            {center.websiteUrl}
          </a>
          <span style={{ fontSize: "14px" }}>{center.address}</span>
        </ListWrap>
      ))}
    </ListWrapper>
  );
}

export default CenterList;
