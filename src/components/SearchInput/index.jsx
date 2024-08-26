import React from 'react';
import { FiSearch } from "react-icons/fi";
import styled from 'styled-components';

const StyledContainer = styled.div`
    margin: 0px 16px;
    .form-container {
        position: relative;
        > .search-image {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0px;
            bottom: 0px;
            inset-inline-start: 4px;
            padding-inline-start: 12px;
            pointer-events: none;
        }
        > .search-input {
            display: block;
            width: 100%;
            padding: 12px;
            padding-inline-start: 48px;
            border-radius: 500px;
            background-color: ${ p => p.theme.colors['bg-white'] };
            ::placeholder {
                font-size: 16px;
                font-weight: 500;
                color: ${ p => p.theme.colors['bg-dark'] };
            }
            &:focus {
                outline: none;
            }
        }
    }
`;

const StyledLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: ${ p => p.theme.colors['bg-dark-gray'] };
`


const SearchInput = ({ placeholder, onSubmit }) => {
    return (
        <StyledContainer>   
            <StyledLabel className="sr-only" htmlFor="search">Search</StyledLabel>
            <form className="form-container" onSubmit={ onSubmit }>
                <div className="search-image">
                    <FiSearch />
                </div>
                <input
                    type="text"
                    id="search"
                    name="search"
                    className="search-input"
                    placeholder={placeholder}
                />
            </form>
        </StyledContainer>
    )
}

export default SearchInput;