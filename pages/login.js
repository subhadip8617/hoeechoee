/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { colors } from '../config/styles/commonStyle';
import PageLayout from '../components/common/PageLayout';

const Login = () => {
  return (
    <PageLayout>
    <div css={logincss}>
      <div className="loginClass">
        <div className="formClass">
          <centre><img src="/assets/images/logo1.png" /></centre>
          {/* <img src='/favicon.ico'/> */}
          <form action="/api/loginapi" method="post">
            {/* <label>Name</label>
            <br/> */}
           {/* <input className='pop' type="text" name="name" placeholder="Enter your name"></input>
            <br/> */}
            {/* <label>Email</label>
            <br/> */}
            <input className='pop' type="email" name="email" placeholder="Enter your email"></input>
            <br />
            {/* <label>Password</label>
            <br/> */}
            <input className='pop' type="password" name="password" placeholder="Enter your password"></input>
            <br />
            <button>Login</button>
          </form>
          <a href="/register">
            <button id='snp'>Sign Up</button>
          </a>
        </div>
      </div>
    </div>
    </PageLayout>
  );
};

const logincss = css`
  * {
    margin: 4px;
    
  }

  input{
    width: 214px;
  }
  
  .pop{
      border :  2px solid black;
      border-radius : 4px;
      text-align: center;
      
  }

  .pop:hover{
    background-color: lightyellow;
  }
  button{
    width: 215px;
    color: black;
    font-weight: bold;
    border-radius : 4px ;
    background-color: #5edc1f;
    height:23px;
  }

  button:hover{
    cursor: pointer;
    background-color : lightgreen;
  }

  img {
    display: inline-block;
    width: 87%;
    margin-left: 12px;
    margin-right: auto;
  }

  .loginClass {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0) 100%),
      url('/assets/images/loginimg.png');
    background-repeat: no-repeat;
    background-size: cover;
    color: black;
  }
  .formClass {
    width: 229px;
    // background-color: lightblue;
    font-family: Comic Sans MS, Fantasy;
    background-color: #8fd2db4d;
    
  }
  

  #snp{
    background-color: #1890ff;
    color:white;
  }
`;

export default Login;
