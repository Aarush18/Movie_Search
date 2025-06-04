import { Stack, TextField } from '@mui/material';

export default function Filters({ year, setYear }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Year"
        type="number"
        variant="outlined"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        InputProps={{ inputProps: { min: 1900, max: 2099 } }}
      />
    </Stack>
  );
}
