import styled, { css } from 'styled-components';

export const OptionItemBox = styled.div<{ isSelected: boolean }>`
  ${({ theme, isSelected }) => {
    return css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem;
      transition: all 0.15s linear;
      outline: none;
      cursor: pointer;
      background: ${isSelected ? theme.colors['background-01'] : `unset`};
      border-top: ${isSelected ? `1px solid ${theme.colors['neutral-500']}` : `unset`};
      border-bottom: ${isSelected ? `1px solid ${theme.colors['neutral-500']}` : `unset`};

      &:hover {
        background: ${theme.colors['background-01']};
      }
    `;
  }}
`;
