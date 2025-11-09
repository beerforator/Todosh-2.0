import React from 'react';
import { Typography } from '@mui/material';

interface SectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle = React.memo(({ children }: SectionTitleProps) => {
  return <Typography variant="h6">{children}</Typography>;
});