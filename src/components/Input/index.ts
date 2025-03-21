import styled from 'styled-components/native';

export const StyledTextInput = styled.TextInput.attrs(() => ({
    placeholderTextColor: '#888',
}))`   
    height: 40px;
    border-color: #ccc;
    border-width: 1px;
    margin-bottom: 12px;
    padding-left: 8px;
`;
