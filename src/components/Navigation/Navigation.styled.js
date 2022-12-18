import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  text-decoration: none;
  font-size: ${p => p.theme.fontSizes.ml}px;
  font-weight: ${p => p.theme.fontWeights.medium};
  color: ${p => p.theme.colors.linkHover};
  text-shadow: ${p => p.theme.shadows.textShadow};
  transition: 300ms linear;
  position: relative;

  :not(:last-child) {
    margin-right: ${p => p.theme.space[4]}px;
  }

  &.active {
    color: ${p => p.theme.colors.linkActive};
  }
  :hover:not(.active),
  :focus:not(.active) {
    color: ${p => p.theme.colors.linkHover};
  }

  &::after {
    content: ' ';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${p => p.theme.colors.linkHover};
    scale: 0;
    transition: 300ms linear;
  }

  :hover::after,
  :focus::after {
    scale: 1;
  }

  &.active::after {
    background-color: ${p => p.theme.colors.linkActive};
    scale: 1;
  }
`;
