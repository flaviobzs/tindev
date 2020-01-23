import styled from 'styled-components';

export const Container = styled.div`
    max-width: 980px;
    margin: 0 auto;
    padding: 50px 0;
    text-align: center;

    ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin-top: 50px;

    li {
    display: flex;
    flex-direction: column;
    }

`;

