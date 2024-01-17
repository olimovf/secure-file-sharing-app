import React from 'react';
import { ContainerProps } from '@mui/material';
import { StyledContainer } from './style';

interface GlobalContainerProps extends ContainerProps {}

const GlobalContainer: React.FC<GlobalContainerProps> = ({
	children,
	...props
}) => {
	return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default GlobalContainer;
