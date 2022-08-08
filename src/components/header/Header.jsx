import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

    return ( 
        <Wrapper onClick={() =>{navigate('/');}}>
            <h1>Home</h1>
        </Wrapper>
     );
}
 
export default Header;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin: 0;
    width: 100%;
`;