import styled from "styled-components";

export const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      /* First column will have the width of the content (big sidebar) */
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      /* Dashboard page will be 90% of content which in this case is 1fr (see above) */
      width: 90%;
    }
  }
`;
