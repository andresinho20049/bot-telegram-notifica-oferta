import { Box, Button, Icon, InputLabel, Paper, TextField } from "@mui/material";
import { forwardRef, ReactNode, useState } from "react";

interface IBoxAppLabelProps {
  children: ReactNode;
  label: string;
}
export const BoxAppLabelOld = ({ children, label }: IBoxAppLabelProps) => {

  // Deixei aqui pq minha intenção era chegar nesse resultado visual, mas tive problemas com state
  return (
    <TextField
      variant="outlined"
      fullWidth
      label={label}
      multiline
      sx={{ '& .MuiOutlinedInput-root': { cursor: 'auto' } }}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: forwardRef((props, ref) => (
          <Box sx={{ width: '100%' }} ref={ref}>
            {children}
          </Box>
        ))
      }}
    />
  );
};


export const BoxAppLabel = ({ children, label }: IBoxAppLabelProps) => {

  const [visible, setVisible] = useState(false);

  return (
    <Paper variant="outlined" sx={{ display: 'flex', gap: 2, flexDirection: 'column', p: 2, width: '100%' }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', py: 1 }}>
        <InputLabel>{label}</InputLabel>
        <Button variant="text" onClick={() => setVisible(!visible)}><Icon>unfold_more</Icon></Button>
      </Box>

      <Box sx={{display: visible ? 'block' : 'none'}}>
        {children}
      </Box>

    </Paper>
  )
}
