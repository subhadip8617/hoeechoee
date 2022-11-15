/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { colors } from '../../config/styles/commonStyle';

export function Logo() {
  return (
    <div css={logoCss}>
      
      <div className="image-wrapper">
        <img src="/assets/images/logo1.png" alt="Mover" />
      </div>
      
    </div>
  );
}

const logoCss = css`
  display: flex;
  align-items: center;
  margin-right: 35px;
  .image-wrapper {
    height: 22px;
    width: auto;
  }
  img {
    max-height: 156%;
    position: relative;
    top: -8px;
  }
  span {
    font-weight: 700;
    font-size: 2.1rem;
    color: ${colors.lightGreen};
  }
`;
