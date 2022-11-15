/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { colors, containerCss } from '../../config/styles/commonStyle';
import { Logo } from './Logo';
import { GithubOutlined } from '@ant-design/icons';

export function Footer() {
  return (
    <footer css={footerCss}>
      <div className="footer-wraper">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <div className="attribution">
          <button>
             Facebook
          </button>
          <button>
             Instagram
          </button>
          <button>
             Email
          </button>
        </div>
      </div>
    </footer>
  );
}

const footerCss = css`
  background-color: ${colors.darkBlue};
  color: white;
  padding: 25px 0;
  margin-top: -20px;
  .footer-wraper {
    ${containerCss};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    // .website-info {
    //   font-size: 1.2rem;
    //   margin: 0;
    // }
    .git-icon {
      margin-left: 10px;
      color: white;
    }
    .creator-info {
      margin-top: 15px;
      .portfolio-link {
        color: white;
        margin-left: 10px;
        text-decoration: none;
        border-bottom: 1px solid ${colors.lightGreen};
      }
    }
    .attribution {
      display: flex;
      align-items: center;
      margin-top: 15px;
      img {
        height: 20px;
        width: auto;
      }
      button{
        border-radius: 5px;
        color: white;
        background-color: coral;
        margin-left: 4px;
        margin-right: 4px;
      }
      span {
        margin-left: 10px;
        font-size: 0.8rem;
      }
    }
  }
`;
